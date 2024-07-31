'use server'

import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
  CustomerCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createPetsFromCart } from './createPetsFromCart'
import { ServerActionError } from '@/@types/common'
import { SignUpForm, SignUpFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
  SHOPIFY_CUSTOMER_EMAIL_COOKIE,
} from '@/utils/constants/cookies'
import { Route } from '@/utils/constants/routes'
import {
  StorefrontDataKey,
  StorefrontErrorKey,
} from '@/utils/constants/storefrontGql'
import {
  handleStorefrontGqlResponse,
  isZodError,
  setCookie,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'
import { getPasswordHash } from '@/utils/functions/password'

export async function signUp(
  _: ServerActionError<SignUpForm> | undefined,
  form: FormData,
): Promise<undefined | ServerActionError<SignUpForm>> {
  const data = {
    email: form.get('email')?.toString() || '',
    password: form.get('password')?.toString() || '',
    firstName: form.get('firstName')?.toString() || '',
    lastName: form.get('lastName')?.toString() || '',
    verifyPassword: form.get('verifyPassword')?.toString() || '',
    countryCode: form.get('countryCode')?.toString() || '',
    mobileNumber: form.get('mobileNumber')?.toString() || '',
    acceptsMarketing: Boolean(form.get('acceptsMarketing') || 'false'),
    origin: form.get('origin')?.toString() || '',
  }

  try {
    SignUpFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  let cartId = ''
  if (cartIdCookie) {
    cartId = cartIdCookie.value
  }
  const passwordHash = getPasswordHash(data.password)
  const phone = `${data.countryCode}${data.mobileNumber}`

  // create customer in db if mobile number and email does not exist
  const { data: existingCustomers, error: selectErr } =
    await Customers.findByEmailOrPhone(data.email, phone)
  if (selectErr || !existingCustomers) {
    logger.error(
      `Unable to find customers by email or phone [email: ${data.email}][phone: ${phone}]: ${selectErr}.`,
    )
    return {
      error: {
        title: 'Failed to find db customers',
        message: selectErr,
      },
    }
  }
  if (existingCustomers.length > 0) {
    return {
      zodError: {
        _errors: [],
        email: {
          _errors: ['Phone or email is already taken'],
        },
        mobileNumber: {
          _errors: ['Phone or email is already taken'],
        },
      },
    }
  }
  const { data: newCustomer, error: createErr } = await Customers.create(
    data.email,
    data.firstName,
    data.lastName,
    passwordHash,
    phone,
    cartId,
    data.acceptsMarketing,
  )
  if (createErr || !newCustomer || newCustomer.length === 0) {
    logger.error(
      `Unable to create new customer [customer: ${JSON.stringify(data)}]: ${createErr}.`,
    )
    return {
      error: {
        title: 'Failed to create db customer',
        message: createErr || '',
      },
    }
  }
  const customerId = newCustomer[0].id

  // create shopify customer
  const customerRes = await storefrontApi.createCustomer({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone,
    password: data.password, // original password
    acceptsMarketing: data.acceptsMarketing,
  })
  const { data: shopifyCustomer, error: customerErr } =
    handleStorefrontGqlResponse<CustomerCreatePayload>(
      customerRes,
      StorefrontDataKey.CUSTOMER_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (customerErr || !shopifyCustomer?.customer) {
    logger.error(
      `Unable to create new shopify customer [customer: ${JSON.stringify(data)}]: ${customerErr}.`,
    )
    return {
      error: {
        title: 'Failed to create Shopify customer',
        message: customerErr || '',
      },
    }
  }

  // create shopify customer access token
  const tokenRes = await storefrontApi.createCustomerAccessToken({
    email: data.email,
    password: data.password,
  })
  const { data: token, error: tokenErr } =
    handleStorefrontGqlResponse<CustomerAccessTokenCreatePayload>(
      tokenRes,
      StorefrontDataKey.CUSTOMER_ACCESS_TOKEN_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (tokenErr || !token || !token.customerAccessToken) {
    logger.error(
      `Unable to create new shopify customer token [customer: ${JSON.stringify(data)}]: ${tokenErr}.`,
    )
    return {
      error: {
        title: 'Failed to create Shopify customer token',
        message: tokenErr || '',
      },
    }
  }

  // update shopify fields in db
  const { error: updateErr } = await Customers.updateShopifyAccessToken(
    token.customerAccessToken.accessToken,
    token.customerAccessToken.expiresAt,
    customerId,
  )
  if (updateErr) {
    logger.error(
      `Unable to update customer token [token: ${token.customerAccessToken.accessToken}][customerId: ${customerId}][expiry: ${token.customerAccessToken.expiresAt}]: ${updateErr}.`,
    )
    return {
      error: {
        title: 'Failed to update db customer',
        message: updateErr,
      },
    }
  }

  // set auth cookies
  const expiryDate = new Date(token.customerAccessToken.expiresAt)
  setCookie(
    cookieStore,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    token.customerAccessToken.accessToken,
    expiryDate,
  )
  setCookie(cookieStore, SHOPIFY_CUSTOMER_EMAIL_COOKIE, data.email, expiryDate)

  // update cart with buyer identity if cart exists
  if (cartId) {
    const cartRes = await storefrontApi.updateCartBuyerEmail({
      cartId,
      buyerIdentity: {
        email: data.email,
      },
    })
    const { data: cart, error: cartErr } =
      handleStorefrontGqlResponse<CartBuyerIdentityUpdatePayload>(
        cartRes,
        StorefrontDataKey.CART_BUYER_IDENTITY_UPDATE,
      )
    if (cartErr || !cart?.cart) {
      logger.error(
        `Unable to update shopify cart buyer identity [cartId: ${cartId}][email: ${data.email}]: ${cartErr}.`,
      )
      return {
        error: {
          title: 'Failed to update cart buyer email',
          message: cartErr || '',
        },
      }
    }

    // create pets from unlinked surveys
    const err = await createPetsFromCart(customerId, cartId)
    if (err) {
      return {
        error: {
          title: 'Failed to create pets from cart products',
          message: err,
        },
      }
    }

    // redirect to shopify checkout link if customer has clicked checkout
    if (data.origin === 'checkout') {
      redirect(cart.cart.checkoutUrl)
    }
  }

  redirect(Route.HOME)
}
