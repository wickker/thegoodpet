import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { createPetsFromCart } from '@/app/account-setup/utils'
import { validateGooglePayload } from '@/app/api/google/utils'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import {
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
  setCookie,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

// Handles login with Google
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const origin = searchParams.get('origin') || ''
  const originPath = origin ? `&origin=${origin}` : ''
  const generateErrParams = generateParams(originPath)

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  let cookieCartId = ''
  if (cartIdCookie) {
    cookieCartId = cartIdCookie.value
  }

  // validate google payload
  const data = await validateGooglePayload(request)
  if (!data.success) {
    redirect(`${Route.LOGIN}?error=${generateErrParams(data.error)}`)
  }
  if (!data.payload) {
    redirect(
      `${Route.LOGIN}?${generateErrParams('Google payload is undefined.')}`,
    )
  }
  const payload = data.payload

  // check if google sub exists
  const { data: subCustomers, error: subErr } = await Customers.findByGoogleSub(
    payload.sub,
  )
  if (subErr || !subCustomers) {
    logger.error(
      `Unable to find customers by google sub [googleSub: ${payload.sub}]: ${subErr}.`,
    )
    redirect(`${Route.LOGIN}?${generateErrParams(subErr)}`)
  }
  if (subCustomers.length === 0) {
    redirect(
      `${Route.LOGIN}?${generateErrParams('Invalid login credentials. Have you already signed up with Google?')}`,
    )
  }
  const customer = subCustomers[0]

  // create shopify customer access token
  const tokenRes = await storefrontApi.createCustomerAccessToken({
    email: customer.email,
    password: customer.password_hash || '',
  })
  const { data: token, error: tokenErr } =
    handleStorefrontGqlResponse<CustomerAccessTokenCreatePayload>(
      tokenRes,
      StorefrontDataKey.CUSTOMER_ACCESS_TOKEN_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (tokenErr || !token || !token.customerAccessToken) {
    logger.error(
      `Unable to create new shopify google customer token [customer: ${JSON.stringify(customer)}]: ${tokenErr}.`,
    )
    redirect(`${Route.LOGIN}?${generateErrParams(tokenErr)}`)
  }

  // update google customer db fields
  const { error: updateErr } =
    await Customers.updateShopifyAccessTokenAndCartId(
      token.customerAccessToken.accessToken,
      token.customerAccessToken.expiresAt,
      customer.id,
      cookieCartId,
    )
  if (updateErr) {
    logger.error(
      `Unable to update google customer token [token: ${token.customerAccessToken.accessToken}][customerId: ${customer.id}][expiry: ${token.customerAccessToken.expiresAt}]: ${updateErr}.`,
    )
    redirect(`${Route.LOGIN}?${generateErrParams(updateErr)}`)
  }

  let checkoutLink = ''
  if (cookieCartId) {
    // update cart with buyer identity
    const cartRes = await storefrontApi.updateCartBuyerEmail({
      cartId: cookieCartId,
      buyerIdentity: {
        email: customer.email,
      },
    })
    const { data: cart, error: cartErr } =
      handleStorefrontGqlResponse<CartBuyerIdentityUpdatePayload>(
        cartRes,
        StorefrontDataKey.CART_BUYER_IDENTITY_UPDATE,
      )
    if (cartErr || !cart?.cart) {
      logger.error(
        `Unable to update shopify cart google buyer identity [cartId: ${cookieCartId}][email: ${customer.email}]: ${cartErr}.`,
      )
      redirect(`${Route.LOGIN}?${generateErrParams(cartErr)}`)
    }
    checkoutLink = cart.cart.checkoutUrl
  }

  // create pets from unlinked surveys
  const cartId = cookieCartId ? cookieCartId : customer.shopify_cart_id || ''
  if (cartId) {
    const err = await createPetsFromCart(customer.id, cartId)
    if (err) {
      redirect(
        `${Route.LOGIN}?${generateErrParams('Failed to create pets from cart products.')}`,
      )
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
    customer.email,
    expiryDate,
  )
  if (!cookieCartId && customer.shopify_cart_id) {
    setCookie(cookieStore, SHOPIFY_CART_ID_COOKIE, customer.shopify_cart_id) // no expiry for cart cookie
  }

  if (origin === 'checkout' && checkoutLink) {
    redirect(checkoutLink)
  }
  redirect(`${Route.HOME}?refetchCart=true`)
}

const generateParams = (originPath: string) => (message: string | null) =>
  `error=${JSON.stringify({ title: 'Login failed', message: message || '' })}${originPath}`
