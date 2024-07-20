import { cookies } from 'next/headers'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'

export async function PUT(request: Request) {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  if (!cartIdCookie) {
    return Response.json(null)
  }

  const req = await request.json()
  const res = await storefrontApi.updateCartItemQuantity({
    cartId: cartIdCookie.value,
    lines: req.lines,
  })

  if (res.errors) {
    return Response.json(
      {
        title: 'Unable to update cart item quantity',
        message: JSON.stringify(res.errors),
      },
      { status: 500 },
    )
  }

  return Response.json(res.data)
}
