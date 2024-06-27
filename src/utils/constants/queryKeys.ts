import { GetAllProductsRequest } from '@/@types/storefrontApi/product'

export const STOREFRONT = 'storefront'

export const QUERY_KEYS = {
  GET_ALL_PRODUCTS: ({ first }: GetAllProductsRequest) => [
    STOREFRONT,
    'products',
    { first },
  ],
}
