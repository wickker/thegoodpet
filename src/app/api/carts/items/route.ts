import { CartLinesRemovePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import { StorefrontDataKey } from '@/utils/constants/storefrontGql'
import { handleStorefrontGqlResponse } from '@/utils/functions/common'

// Add item to cart
export async function PUT(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    return Response.json(null)
  }

  const req = await request.json()
  const res = await storefrontApi.addItemToCart({
    cartId: cartIdCookie.value,
    lines: req.lines,
  })

  if (res.errors) {
    return Response.json(
      {
        title: 'Failed to add item to cart',
        message: JSON.stringify(res.errors),
      },
      { status: 500 },
    )
  }

  return Response.json(res.data)
}

// Delete item from cart
export async function DELETE(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
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
