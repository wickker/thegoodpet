'use server'

import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
  CustomerCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ServerActionError } from '@/@types/common'
import { SignUpForm, SignUpFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN,
  SHOPIFY_CUSTOMER_EMAIL,
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
import { getPasswordHash } from '@/utils/functions/password'

export async function signUp(_: ServerActionError<SignUpForm>, form: FormData) {
  const data = {
    email: form.get('email')?.toString() || '',
    password: form.get('password')?.toString() || '',
    firstName: form.get('firstName')?.toString() || '',
    lastName: form.get('lastName')?.toString() || '',
    verifyPassword: form.get('verifyPassword')?.toString() || '',
    countryCode: form.get('countryCode')?.toString() || '',
    mobileNumber: form.get('mobileNumber')?.toString() || '',
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
    return {
      zodError: null,
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
  )
  if (createErr || !newCustomer || newCustomer.length === 0) {
    return {
      zodError: null,
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
    acceptsMarketing: true,
  })
  const { data: shopifyCustomer, error: customerErr } =
    handleStorefrontGqlResponse<CustomerCreatePayload>(
      customerRes,
      StorefrontDataKey.CUSTOMER_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (customerErr || !shopifyCustomer?.customer) {
    return {
      zodError: null,
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
    return {
      zodError: null,
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
    return {
      zodError: null,
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
    SHOPIFY_CUSTOMER_TOKEN,
    token.customerAccessToken.accessToken,
    expiryDate,
  )
  setCookie(cookieStore, SHOPIFY_CUSTOMER_EMAIL, data.email, expiryDate)

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
      return {
        zodError: null,
        error: {
          title: 'Failed to update cart buyer email',
          message: cartErr || '',
        },
      }
    }

    // TODO: 


    // redirect to shopify checkout link if customer has clicked checkout
    if (data.origin === 'checkout') {
      redirect(cart.cart.checkoutUrl)
    }
  }

  redirect(Route.HOME)
}
