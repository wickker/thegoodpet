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
  GET_CUSTOM_MEAL: (id: string) => [THE_GOOD_PET, 'custom-meal', id],
  GET_CUSTOMER_ORDERS: ({ first }: CustomerOrdersArgs) => [
    THE_GOOD_PET,
    'customer-orders',
    { first },
  ],
  GET_LOGGED_IN_USER: [THE_GOOD_PET, 'logged-in-user']
}
