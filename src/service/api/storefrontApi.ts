import type {
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
  QueryRootProductsArgs,
  CustomerOrdersArgs,
  CartInput,
  MutationCartLinesAddArgs,
  MutationCartLinesUpdateArgs,
  MutationCartBuyerIdentityUpdateArgs,
  MutationCartLinesRemoveArgs,
  Cart,
  Customer,
  CartCreatePayload,
  CustomerCreatePayload,
  CustomerAccessTokenCreatePayload,
  CartLinesAddPayload,
  CartLinesRemovePayload,
  CartLinesUpdatePayload,
  CartBuyerIdentityUpdatePayload,
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
  apiVersion: '2024-04',
  publicAccessToken: Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
})

// GET
const getAllProducts = (
  request: QueryRootProductsArgs,
): Promise<ClientResponse> =>
  client.request(Products.GetAll, {
    variables: request,
  })

const getCart = (cartId?: string): Promise<ClientResponse<{ cart: Cart }>> =>
  client.request(Carts.Get, {
    variables: { cartId },
  })

const getCustomer = (
  accessToken: string,
  request: CustomerOrdersArgs,
): Promise<ClientResponse<{ customer: Customer }>> =>
  client.request(Customers.Get, {
    variables: {
      customerAccessToken: accessToken,
      ...request,
    },
  })

// POST
const createCart = (
  request: CartInput,
): Promise<ClientResponse<CartCreatePayload>> =>
  client.request(Carts.Create, {
    variables: {
      cartInput: request,
    },
  })

// Automatically triggers a 'Customer account confimation' email sent from Shopify
const createCustomer = (
  request: CustomerCreateInput,
): Promise<ClientResponse<CustomerCreatePayload>> =>
  client.request(Customers.Create, {
    variables: {
      input: request,
    },
  })

const createCustomerAccessToken = (
  request: CustomerAccessTokenCreateInput,
): Promise<ClientResponse<CustomerAccessTokenCreatePayload>> =>
  client.request(Customers.CreateAccessToken, {
    variables: {
      input: request,
    },
  })

// PUT
const addItemToCart = (
  request: MutationCartLinesAddArgs,
): Promise<ClientResponse<CartLinesAddPayload>> =>
  client.request(Carts.AddItem, {
    variables: request,
  })

const updateCartItemQuantity = (
  request: MutationCartLinesUpdateArgs,
): Promise<ClientResponse<CartLinesUpdatePayload>> =>
  client.request(Carts.UpdateQuantity, {
    variables: request,
  })

const updateCartBuyerEmail = (
  request: MutationCartBuyerIdentityUpdateArgs,
): Promise<ClientResponse<CartBuyerIdentityUpdatePayload>> =>
  client.request(Carts.UpdateBuyerEmail, {
    variables: request,
  })

// DELETE
const deleteItemFromCart = (
  request: MutationCartLinesRemoveArgs,
): Promise<ClientResponse<CartLinesRemovePayload>> =>
  client.request(Carts.DeleteItem, {
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
