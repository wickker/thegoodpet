'use server'

import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ServerActionError } from '@/@types/common'
import { LoginForm, LoginFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_EMAIL,
  SHOPIFY_CUSTOMER_TOKEN,
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
import { doesPasswordMatch } from '@/utils/functions/password'

export async function login(_: ServerActionError<LoginForm>, form: FormData) {
  const data = {
    email: form.get('email')?.toString() || '',
    password: form.get('password')?.toString() || '',
    origin: form.get('origin')?.toString() || '',
  }

  try {
    LoginFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  // get customer by email and validate password
  const { data: existingCustomers, error: selectErr } =
    await Customers.findByEmail(data.email)
  if (selectErr || !existingCustomers) {
    return {
      zodError: null,
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
        email: {
          _errors: ['Invalid email or password'],
        },
        password: {
          _errors: ['Invalid email or password'],
        },
      },
    }
  }
  const dbCustomer = existingCustomers[0]

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

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)

  let cartIdToUpdate = ''
  let checkoutLink = ''
  if (cartIdCookie) {
    cartIdToUpdate = cartIdCookie.value // update db cart with cookie value even if another cart is currently linked

    // update cart with buyer identity
    const cartRes = await storefrontApi.updateCartBuyerEmail({
      cartId: cartIdToUpdate,
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
    checkoutLink = cart.cart.checkoutUrl
  }

  // update customer db fields
  const { error: updateErr } =
    await Customers.updateShopifyAccessTokenAndCartId(
      token.customerAccessToken.accessToken,
      token.customerAccessToken.expiresAt,
      dbCustomer.id,
      cartIdToUpdate,
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

  //   const cartId = cartIdCookie
  //     ? cartIdCookie.value
  //     : dbCustomer.shopify_cart_id || ''

  // TODO:

  // set auth and cart cookies
  const expiryDate = new Date(token.customerAccessToken.expiresAt)
  setCookie(
    cookieStore,
    SHOPIFY_CUSTOMER_TOKEN,
    token.customerAccessToken.accessToken,
    expiryDate,
  )
  setCookie(cookieStore, SHOPIFY_CUSTOMER_EMAIL, data.email, expiryDate)
  if (!cartIdCookie && dbCustomer.shopify_cart_id) {
    setCookie(cookieStore, SHOPIFY_CART_ID_COOKIE, dbCustomer.shopify_cart_id) // no expiry for cart cookie
  }

  if (data.origin === 'checkout' && checkoutLink) {
    redirect(checkoutLink)
  }
  redirect(`${Route.HOME}?refetchCart=true`)
}
