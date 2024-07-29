import {
  Cart,
  CartLinesAddPayload,
  CartLinesRemovePayload,
  CartLinesUpdatePayload,
  MutationCartLinesAddArgs,
  MutationCartLinesRemoveArgs,
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
): Promise<CartLinesAddPayload | null> => {
  const res = await fetch('/api/carts/items', {
    method: 'PUT',
    body: JSON.stringify(request),
  })
  return handleResponse(res)
}

const updateCartItemQuantity = async (
  request: Partial<MutationCartLinesUpdateArgs>,
): Promise<CartLinesUpdatePayload | null> => {
  const res = await fetch('/api/carts/items/quantity', {
    method: 'PUT',
    body: JSON.stringify(request),
  })
  return handleResponse(res)
}

// DELETE
const deleteItemFromCart = async (
  request: Partial<MutationCartLinesRemoveArgs>,
): Promise<CartLinesRemovePayload | null> => {
  const res = await fetch('/api/carts/items', {
    method: 'DELETE',
    body: JSON.stringify(request),
  })
  return handleResponse(res)
}

export default {
  addItemToCart,
  deleteItemFromCart,
  getCart,
  updateCartItemQuantity,
}
