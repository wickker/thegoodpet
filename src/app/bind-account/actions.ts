'use server'

import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createPetsFromCart } from '../account-setup/utils'
import { ServerActionError } from '@/@types/common'
import { BindAccountForm, BindAccountFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import {
  BIND_ACCOUNT_EMAIL_COOKIE,
  BIND_ACCOUNT_GOOGLE_SUB_COOKIE,
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_EMAIL_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
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
import { doesPasswordMatch } from '@/utils/functions/password'

export async function bindAccountAndLogin(
  _: undefined | ServerActionError<BindAccountForm>,
  form: FormData,
): Promise<undefined | ServerActionError<BindAccountForm>> {
  const data = {
    password: form.get('password')?.toString() || '',
    origin: form.get('origin')?.toString() || '',
  }

  try {
    BindAccountFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  // get bind account cookies
  const cookieStore = cookies()
  const emailCookie = cookieStore.get(BIND_ACCOUNT_EMAIL_COOKIE)
  const subCookie = cookieStore.get(BIND_ACCOUNT_GOOGLE_SUB_COOKIE)
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  let cookieCartId = ''
  if (cartIdCookie) {
    cookieCartId = cartIdCookie.value
  }
  if (!emailCookie || !subCookie) {
    return {
      error: {
        title: 'Failed to bind account',
        message: 'Bind account cookies have expired.',
      },
    }
  }

  // get customer by email and validate password
  const { data: existingCustomers, error: selectErr } =
    await Customers.findByEmail(emailCookie.value)
  if (selectErr || !existingCustomers) {
    logger.error(
      `Unable to find customer by email [email: ${emailCookie.value}]: ${selectErr}.`,
    )
    return {
      error: {
        title: 'Failed to find db customers',
        message: selectErr,
      },
    }
  }
  if (
    existingCustomers.length === 0 ||
    !doesPasswordMatch(data.password, existingCustomers[0].password_hash)
  ) {
    return {
      zodError: {
        _errors: [],
        password: {
          _errors: ['Invalid password'],
        },
      },
    }
  }
  const dbCustomer = existingCustomers[0]

  // create shopify customer access token
  const tokenRes = await storefrontApi.createCustomerAccessToken({
    email: emailCookie.value,
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

  let checkoutLink = ''
  if (cookieCartId) {
    // update cart with buyer identity
    const cartRes = await storefrontApi.updateCartBuyerEmail({
      cartId: cookieCartId,
      buyerIdentity: {
        email: emailCookie.value,
      },
    })
    const { data: cart, error: cartErr } =
      handleStorefrontGqlResponse<CartBuyerIdentityUpdatePayload>(
        cartRes,
        StorefrontDataKey.CART_BUYER_IDENTITY_UPDATE,
      )
    if (cartErr || !cart?.cart) {
      logger.error(
        `Unable to update shopify cart buyer identity [cartId: ${cookieCartId}][email: ${emailCookie.value}]: ${cartErr}.`,
      )
      return {
        error: {
          title: 'Failed to update cart buyer email',
          message: cartErr || '',
        },
      }
    }
    checkoutLink = cart.cart.checkoutUrl
  }

  // update customer db fields
  const { error: updateErr } =
    await Customers.updateGoogleSubShopifyAccessTokenAndCartId(
      token.customerAccessToken.accessToken,
      token.customerAccessToken.expiresAt,
      dbCustomer.id,
      cookieCartId, // update db cart with cookie value even if another cart is currently linked
      subCookie.value,
      data.password, // raw password
    )
  if (updateErr) {
    logger.error(
      `Unable to update customer token and sub [token: ${token.customerAccessToken.accessToken}][customerId: ${dbCustomer.id}][expiry: ${token.customerAccessToken.expiresAt}][sub: ${subCookie.value}][password: ${data.password}]: ${updateErr}.`,
    )
    return {
      error: {
        title: 'Failed to update db customer',
        message: updateErr,
      },
    }
  }

  // create pets from unlinked surveys
  const cartId = cookieCartId ? cookieCartId : dbCustomer.shopify_cart_id || ''
  if (cartId) {
    const err = await createPetsFromCart(dbCustomer.id, cartId)
    if (err) {
      return {
        error: {
          title: 'Failed to create pets from cart products',
          message: err,
        },
      }
    }
  }

  // set auth and cart cookies
  const expiryDate = new Date(token.customerAccessToken.expiresAt)
  setCookie(
    cookieStore,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    token.customerAccessToken.accessToken,
    expiryDate,
  )
  setCookie(
    cookieStore,
    SHOPIFY_CUSTOMER_EMAIL_COOKIE,
    emailCookie.value,
    expiryDate,
  )
  if (!cartIdCookie && dbCustomer.shopify_cart_id) {
    setCookie(cookieStore, SHOPIFY_CART_ID_COOKIE, dbCustomer.shopify_cart_id) // no expiry for cart cookie
  }

  // delete bind account cookies
  cookieStore.delete(emailCookie.name)
  cookieStore.delete(subCookie.name)

  if (data.origin === 'checkout' && checkoutLink) {
    redirect(checkoutLink)
  }
  redirect(`${Route.HOME}?refetchCart=true`)
}
