import {
  QueryRootProductsArgs,
  CustomerOrdersArgs,
} from '@shopify/hydrogen-react/storefront-api-types'

export const STOREFRONT = 'storefront'

export const QUERY_KEYS = {
  GET_ALL_PRODUCTS: ({ first }: QueryRootProductsArgs) => [
    STOREFRONT,
    'products',
    { first },
  ],
  GET_CART: (cartId?: string) => [STOREFRONT, 'carts', cartId],
  GET_CUSTOMER_ORDERS: ({ first }: CustomerOrdersArgs) => [
    STOREFRONT,
    'customer-orders',
    { first },
  ],
}
