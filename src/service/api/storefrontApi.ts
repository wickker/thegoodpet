import type {
  Product,
  CustomerCreatePayload,
  CustomerAccessTokenCreateInput,
  CustomerAccessTokenCreatePayload,
  CustomerCreateInput,
  QueryRootProductsArgs,
  CustomerOrdersArgs,
  Customer,
} from '@shopify/hydrogen-react/storefront-api-types'
import {
  ClientResponse,
  createStorefrontApiClient,
} from '@shopify/storefront-api-client'
import Config from '@/configs'
import Customers from '@/graphql/customers'
import Products from '@/graphql/products'

const client = createStorefrontApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.SHOPIFY_API_VERSION,
  publicAccessToken: Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})

// GQL errors are status 200
const handleErr = (res: ClientResponse) => {
  if (res.errors) {
    // TODO: Refine this
    console.error(res.errors)
  }
  return res
}

// GET
// TODO: Convert to proper pagination in the future
const getAllProducts = (
  request: QueryRootProductsArgs,
): Promise<Array<Partial<Product>>> =>
  client
    .request(Products.GetAll, {
      variables: request,
    })
    .then(handleErr)
    .then((res) => res.data.products.nodes)

const getCustomerOrders = (
  accessToken: string,
  request: CustomerOrdersArgs,
): Promise<Customer> =>
  client
    .request(Customers.GetOrders, {
      variables: {
        customerAccessToken: accessToken,
        ...request,
      },
    })
    .then(handleErr)
    .then((res) => res.data)

// POST
const createCustomer = (
  request: CustomerCreateInput,
): Promise<CustomerCreatePayload> =>
  client
    .request(Customers.Create, {
      variables: {
        input: request,
      },
    })
    .then(handleErr)
    .then((res) => res.data.customerCreate)

const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput,
): Promise<CustomerAccessTokenCreatePayload> =>
  client
    .request(Customers.CreateAccessToken, {
      variables: {
        input: request,
      },
    })
    .then(handleErr)
    .then((res) => res.data)

export default {
  createCustomer,
  createCustomerAccessToken,
  getAllProducts,
  getCustomerOrders,
}
