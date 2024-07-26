import { CartBase } from '@shopify/hydrogen-react/cart-types'
import {
  Cart,
  MutationCartLinesAddArgs,
  MutationCartLinesUpdateArgs,
} from '@shopify/hydrogen-react/storefront-api-types'

// TODO: Modify this to handle errors within the data key e.g. customerUserErrors / userErrors
const handleResponse = async (res: Response) => {
  const json = await res.json()
  if (!res.ok) {
    throw new Error(JSON.stringify(json)) // react query provider catches this
  }
  return json
}

// GET
const getCart = async (): Promise<Cart> => {
  const res = await fetch('/api/carts')
  return handleResponse(res)
}

// PUT
const addItemToCart = async (
  request: Partial<MutationCartLinesAddArgs>,
): Promise<CartBase | null> => {
  const res = await fetch('/api/carts/items', {
    method: 'PUT',
    body: JSON.stringify(request),
  })
  return handleResponse(res)
}

const updateCartItemQuantity = async (
  request: Partial<MutationCartLinesUpdateArgs>,
): Promise<CartBase | null> => {
  const res = await fetch('/api/carts/items/quantity', {
    method: 'PUT',
    body: JSON.stringify(request),
  })
  return handleResponse(res)
}

export default {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
}
