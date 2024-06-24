import { GetAllProductsRequest } from '@/@types/api/product'

export const STOREFRONT = 'storefront'

export const QUERY_KEYS = {
  GET_ALL_PRODUCTS: ({ first }: GetAllProductsRequest) => [
    STOREFRONT,
    'products',
    { first },
  ],
}
