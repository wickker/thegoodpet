import {
  CartBuyerIdentityUpdatePayload,
  CustomerAccessTokenCreatePayload,
  CustomerCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { createPetsFromCart } from '@/app/account-setup/utils'
import { validateGooglePayload } from '@/app/api/google/utils'
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
  setCookie,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

// Handles sign up with Google
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const origin = searchParams.get('origin') || ''
  const originPath = origin ? `&origin=${origin}` : ''
  const generateErrParams = generateParams(originPath)

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  let cartId = ''
  if (cartIdCookie) {
    cartId = cartIdCookie.value
  }

  // validate google payload
  const data = await validateGooglePayload(request)
  if (!data.success) {
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(data.error)}`)
  }
  if (!data.payload) {
    redirect(
      `${Route.ACCOUNT_SETUP}?${generateErrParams('Google payload is undefined.')}`,
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
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(subErr)}`)
  }
  if (subCustomers.length > 0) {
    logger.error(
      `Customer with sub already exists [googleSub: ${payload.sub}].`,
    )
    redirect(
      `${Route.ACCOUNT_SETUP}?${generateErrParams('Google customer already exists, please login instead.')}`,
    )
  }

  // check if email already exists
  const email = payload.email
  if (!email) {
    logger.error(`Google payload email is undefined [email: ${email}]`)
    redirect(
      `${Route.ACCOUNT_SETUP}?${generateErrParams('Google payload email is undefined.')}`,
    )
  }
  const { data: emailCustomers, error: emailErr } =
    await Customers.findByEmail(email)
  if (emailErr || !emailCustomers) {
    logger.error(
      `Unable to find customers by google email [email: ${email}]: ${emailErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(emailErr)}`)
  }
  if (emailCustomers.length > 0) {
    const fifteenMinutesLater = DateTime.now().plus({ minutes: 15 }).toJSDate()
    setCookie(
      cookieStore,
      BIND_ACCOUNT_EMAIL_COOKIE,
      email,
      fifteenMinutesLater,
    )
    setCookie(
      cookieStore,
      BIND_ACCOUNT_GOOGLE_SUB_COOKIE,
      payload.sub,
      fifteenMinutesLater,
    )
    redirect(`${Route.BIND_ACCOUNT}?origin=${origin}`)
  }

  // create google customer in db
  const password = Date.now().toString()
  const { data: newCustomer, error: createErr } = await Customers.createGoogle(
    email,
    password, // password not hashed for google customers
    cartId,
    payload.sub,
  )
  if (createErr || !newCustomer || newCustomer.length === 0) {
    logger.error(
      `Unable to create new google customer [email: ${email}][password: ${password}]: ${createErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(createErr)}`)
  }
  const customerId = newCustomer[0].id

  // create shopify google customer
  const customerRes = await storefrontApi.createCustomer({
    email,
    password,
    acceptsMarketing: true,
  })
  const { data: shopifyCustomer, error: customerErr } =
    handleStorefrontGqlResponse<CustomerCreatePayload>(
      customerRes,
      StorefrontDataKey.CUSTOMER_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (customerErr || !shopifyCustomer?.customer) {
    logger.error(
      `Unable to create new shopify google customer [email: ${email}][password: ${password}]: ${customerErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(customerErr)}`)
  }

  // create shopify google customer access token
  const tokenRes = await storefrontApi.createCustomerAccessToken({
    email,
    password,
  })
  const { data: token, error: tokenErr } =
    handleStorefrontGqlResponse<CustomerAccessTokenCreatePayload>(
      tokenRes,
      StorefrontDataKey.CUSTOMER_ACCESS_TOKEN_CREATE,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (tokenErr || !token || !token.customerAccessToken) {
    logger.error(
      `Unable to create new shopify google customer token [email: ${email}][password: ${password}]: ${tokenErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(tokenErr)}`)
  }

  // update shopify fields in db
  const { error: updateErr } =
    await Customers.updateShopifyAccessTokenAndCustomerId(
      token.customerAccessToken.accessToken,
      token.customerAccessToken.expiresAt,
      customerId,
      shopifyCustomer.customer.id,
    )
  if (updateErr) {
    logger.error(
      `Unable to update google customer token [token: ${token.customerAccessToken.accessToken}][customerId: ${customerId}][expiry: ${token.customerAccessToken.expiresAt}]: ${updateErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(updateErr)}`)
  }

  // set auth cookies
  const expiryDate = new Date(token.customerAccessToken.expiresAt)
  setCookie(
    cookieStore,
    SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    token.customerAccessToken.accessToken,
    expiryDate,
  )
  setCookie(cookieStore, SHOPIFY_CUSTOMER_EMAIL_COOKIE, email, expiryDate)

  // update cart with buyer identity if cart exists
  if (cartId) {
    const cartRes = await storefrontApi.updateCartBuyerEmail({
      cartId,
      buyerIdentity: {
        email,
      },
    })
    const { data: cart, error: cartErr } =
      handleStorefrontGqlResponse<CartBuyerIdentityUpdatePayload>(
        cartRes,
        StorefrontDataKey.CART_BUYER_IDENTITY_UPDATE,
      )
    if (cartErr || !cart?.cart) {
      logger.warn(
        `Unable to update shopify cart google buyer identity [cartId: ${cartId}][email: ${email}]: ${cartErr}.`,
      )
      redirect(`${Route.ACCOUNT_SETUP}?${generateErrParams(cartErr)}`)
    }

    // create pets from unlinked surveys
    const err = await createPetsFromCart(customerId, cartId)
    if (err) {
      redirect(
        `${Route.ACCOUNT_SETUP}?${generateErrParams('Failed to create pets from cart products.')}`,
      )
    }

    // redirect to shopify checkout link if customer has clicked checkout
    if (origin === 'checkout') {
      redirect(cart.cart.checkoutUrl)
    }
  }

  redirect(Route.HOME)
}

const generateParams = (originPath: string) => (message: string | null) =>
  `error=${JSON.stringify({ title: 'Sign up failed', message: message || '' })}${originPath}`
