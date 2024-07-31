import {
  CartLinesAddPayload,
  CartLinesRemovePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import { StorefrontDataKey } from '@/utils/constants/storefrontGql'
import { handleStorefrontGqlResponse } from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

// Add item to cart
export async function PUT(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    logger.warn('Cart cookie does not exist.')
    return Response.json(null)
  }

  const req = await request.json()
  const res = await storefrontApi.addItemToCart({
    cartId: cartIdCookie.value,
    lines: req.lines,
  })
  const { data, error } = handleStorefrontGqlResponse<CartLinesAddPayload>(
    res,
    StorefrontDataKey.CART_LINES_ADD,
  )

  if (error) {
    logger.error(
      `Unable to add items to cart [cartId: ${cartIdCookie.value}][lines: ${req.lines}]: ${error}.`,
    )
    return Response.json(
      {
        title: 'Failed to add item to cart',
        message: error,
      },
      { status: 500 },
    )
  }

  return Response.json(data)
}

// Delete item from cart
export async function DELETE(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    logger.warn('Cart cookie does not exist.')
    return Response.json(null)
  }

  const req = await request.json()
  const res = await storefrontApi.deleteItemFromCart({
    cartId: cartIdCookie.value,
    lineIds: req.lineIds,
  })
  const { data, error } = handleStorefrontGqlResponse<CartLinesRemovePayload>(
    res,
    StorefrontDataKey.CART_LINES_REMOVE,
  )

  if (error) {
    logger.error(
      `Unable to delete item from cart [cartId: ${cartIdCookie.value}][lineIds: ${req.lineIds}]: ${error}.`,
    )
    return Response.json(
      {
        title: 'Failed to delete item from cart',
        message: error,
      },
      { status: 500 },
    )
  }

  return Response.json(data)
}
