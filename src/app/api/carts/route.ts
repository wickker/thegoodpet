import { cookies } from 'next/headers'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import { logger } from '@/utils/functions/logger'

// Get cart based on cookie
export async function GET() {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    logger.warn('Cart cookie does not exist.')
    return Response.json(null)
  }

  const res = await storefrontApi.getCart(cartIdCookie.value)
  if (res.errors || !res.data) {
    logger.error(
      `Unable to get cart [cartId: ${cartIdCookie.value}]: ${JSON.stringify(res.errors)}.`,
    )
    return Response.json(
      { title: 'Failed to get cart', message: JSON.stringify(res.errors) },
      { status: 500 },
    )
  }

  return Response.json(res.data.cart)
}
