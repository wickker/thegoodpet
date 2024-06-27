import { QueryRootProductsArgs } from '@shopify/hydrogen-react/storefront-api-types'

export const STOREFRONT = 'storefront'

export const QUERY_KEYS = {
  GET_ALL_PRODUCTS: ({ first }: QueryRootProductsArgs) => [
    STOREFRONT,
    'products',
    { first },
  ],
}
