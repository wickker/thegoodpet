import { CartBase } from '@shopify/hydrogen-react/cart-types'
import {
  Cart,
  MutationCartLinesUpdateArgs,
} from '@shopify/hydrogen-react/storefront-api-types'

const handleRequest = async (res: Response) => {
  const json = await res.json()
  if (!res.ok) {
    throw new Error(JSON.stringify(json))
  }
  return json
}

// GET
const getCart = async (): Promise<Cart> => {
  const res = await fetch('/api/carts')
  return handleRequest(res)
}

// PUT
const updateCartItemQuantity = async (
  request: Partial<MutationCartLinesUpdateArgs>,
): Promise<CartBase> => {
  const res = await fetch('/api/carts/items/quantity', {
    method: 'PUT',
    body: JSON.stringify(request),
  })
  return handleRequest(res)
}

export default {
  getCart,
  updateCartItemQuantity,
}
