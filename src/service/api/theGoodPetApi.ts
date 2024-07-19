import { Cart } from '@shopify/hydrogen-react/storefront-api-types'

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

export default {
  getCart,
}
