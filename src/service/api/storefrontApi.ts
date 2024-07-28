import { CartBase } from '@shopify/hydrogen-react/cart-types'
import type {
  Product,
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  QueryRootProductsArgs,
  CustomerOrdersArgs,
  CartInput,
  MutationCartLinesAddArgs,
  MutationCartLinesUpdateArgs,
  MutationCartBuyerIdentityUpdateArgs,
  MutationCartLinesRemoveArgs,
} from '@shopify/hydrogen-react/storefront-api-types'
import {
  ClientResponse,
  createStorefrontApiClient,
} from '@shopify/storefront-api-client'
import Config from '@/configs'
import Carts from '@/graphql/carts'
import Customers from '@/graphql/customers'
import Products from '@/graphql/products'

const client = createStorefrontApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.SHOPIFY_API_VERSION,
  publicAccessToken: Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})

// GET
const getAllProducts = (
  request: QueryRootProductsArgs,
): Promise<Array<Partial<Product>>> =>
  client
    .request(Products.GetAll, {
      variables: request,
    })
    .then((res) => res.data.products.nodes)

const getCart = (cartId?: string): Promise<ClientResponse> =>
  client.request(Carts.Get, {
    variables: { cartId },
  })

const getCustomer = (
  accessToken: string,
  request: CustomerOrdersArgs,
): Promise<ClientResponse> =>
  client.request(Customers.Get, {
    variables: {
      customerAccessToken: accessToken,
      ...request,
    },
  })

// POST
const createCart = (request: CartInput): Promise<CartBase> =>
  client
    .request(Carts.Create, {
      variables: {
        cartInput: request,
      },
    })
    .then((res) => res.data)

// Automatically triggers a 'Customer account confimation' email sent from Shopify
const createCustomer = (
  request: CustomerCreateInput,
): Promise<ClientResponse> =>
  client.request(Customers.Create, {
    variables: {
      input: request,
    },
  })

const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput,
): Promise<ClientResponse> =>
  client.request(Customers.CreateAccessToken, {
    variables: {
      input: request,
    },
  })

// PUT
const addItemToCart = (
  request: MutationCartLinesAddArgs,
): Promise<ClientResponse> =>
  client.request(Carts.AddItem, {
    variables: request,
  })

const deleteItemFromCart = (
  request: MutationCartLinesRemoveArgs,
): Promise<ClientResponse> =>
  client.request(Carts.DeleteItem, {
    variables: request,
  })

const updateCartItemQuantity = (
  request: MutationCartLinesUpdateArgs,
): Promise<ClientResponse> =>
  client.request(Carts.UpdateQuantity, {
    variables: request,
  })

const updateCartBuyerEmail = (
  request: MutationCartBuyerIdentityUpdateArgs,
): Promise<ClientResponse> =>
  client.request(Carts.UpdateBuyerEmail, {
    variables: request,
  })

export default {
  addItemToCart,
  createCart,
  createCustomer,
  createCustomerAccessToken,
  deleteItemFromCart,
  getAllProducts,
  getCart,
  getCustomer,
  updateCartBuyerEmail,
  updateCartItemQuantity,
}
