import type {
  Product,
  CustomerCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { CreateCustomerRequest } from '@/@types/storefrontApi/customer'
import { GetAllProductsRequest } from '@/@types/storefrontApi/product'
import Config from '@/configs'
import Customers from '@/graphql/customers'
import Products from '@/graphql/products'

const client = createStorefrontApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.SHOPIFY_API_VERSION,
  publicAccessToken: Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})

// GET
// TODO: Convert to proper pagination in the future
const getAllProducts = (
  request: GetAllProductsRequest,
): Promise<Array<Partial<Product>>> =>
  client
    .request(Products.GetAll, {
      variables: request,
    })
    .then((res) => res.data.products.nodes)

// POST
const createCustomer = (
  request: CreateCustomerRequest,
): Promise<CustomerCreatePayload> =>
  client
    .request(Customers.Create, {
      variables: request,
    })
    .then((res) => res.data.customerCreate)

export default {
  createCustomer,
  getAllProducts,
}
