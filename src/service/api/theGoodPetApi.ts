import {
  Cart,
  CartLinesAddPayload,
  CartLinesRemovePayload,
  CartLinesUpdatePayload,
  MutationCartLinesAddArgs,
  MutationCartLinesRemoveArgs,
  MutationCartLinesUpdateArgs,
} from '@shopify/hydrogen-react/storefront-api-types'
import { BaseError } from '@/@types/common'
import { GetCustomMealResponse } from '@/@types/product'

const handleResponse = async (res: Response) => {
  const json = await res.json()
  if (!res.ok) {
    throw new Error(JSON.stringify(json as BaseError)) // react query provider catches this
  }
  return json
}

// GET
const getCart = async (): Promise<Cart> => {
  const res = await fetch('/api/carts')
  return handleResponse(res)
}

const getCustomMeal = async (id: string): Promise<GetCustomMealResponse> => {
  const res = await fetch(`/api/custom-meals/${id}`)
  return handleResponse(res)
}

const getLoggedInUser = async (): Promise<string> => {
  const res = await fetch('/api/auth')
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
  getCustomMeal,
  getLoggedInUser,
  updateCartItemQuantity,
}
