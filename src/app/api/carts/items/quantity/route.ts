import { CartLinesUpdatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import { StorefrontDataKey } from '@/utils/constants/storefrontGql'
import { handleStorefrontGqlResponse } from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

// Update cart item quantity
export async function PUT(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    logger.warn('Cart cookie does not exist.')
    return Response.json(null)
  }

  const req = await request.json()
  const res = await storefrontApi.updateCartItemQuantity({
    cartId: cartIdCookie.value,
    lines: req.lines,
  })
  const { data, error } = handleStorefrontGqlResponse<CartLinesUpdatePayload>(
    res,
    StorefrontDataKey.CART_LINES_UPDATE,
  )
  if (error) {
    logger.error(
      `Unable to update cart item quantity [cartId: ${cartIdCookie.value}][lines: ${req.lines}]: ${error}.`,
    )
    return Response.json(
      {
        title: 'Failed to update cart item quantity',
        message: error,
      },
      { status: 500 },
    )
  }

  return Response.json(data)
}
