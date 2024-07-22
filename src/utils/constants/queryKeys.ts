import {
  QueryRootProductsArgs,
  CustomerOrdersArgs,
} from '@shopify/hydrogen-react/storefront-api-types'

export const THE_GOOD_PET = 'the-good-pet'

export const QUERY_KEYS = {
  GET_ALL_PRODUCTS: ({ first }: QueryRootProductsArgs) => [
    THE_GOOD_PET,
    'products',
    { first },
  ],
  GET_CART: [THE_GOOD_PET, 'carts'],
  GET_CUSTOMER_ORDERS: ({ first }: CustomerOrdersArgs) => [
    THE_GOOD_PET,
    'customer-orders',
    { first },
  ],
}
