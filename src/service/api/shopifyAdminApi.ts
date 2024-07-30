import { ClientResponse, createAdminApiClient } from '@shopify/admin-api-client'
import {
  CreateProductResponse,
  CreateProductVariantResponse,
} from '@/@types/product'
import Config from '@/configs'
import Products from '@/graphql/products'

const client = createAdminApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  accessToken: Config.SHOPIFY_ADMIN_ACCESS_TOKEN,
})

// TODO: Debug this
const addProductToSellingPlan = (id: string) =>
  client.request(Products.AddToSellingPlan, {
    variables: {
      id,
      sellingPlanGroupIds: ['gid://shopify/SellingPlanGroup/1543929913'],
    },
  })

const createProduct = (
  title: string,
  descriptionHtml: string,
): Promise<ClientResponse<CreateProductResponse>> =>
  client.request(Products.Create, {
    variables: {
      input: {
        title,
        descriptionHtml,
        customProductType: 'Tailor-made meal',
        requiresSellingPlan: true,
      },
    },
  })

const createProductVariant = (
  productId: string,
  price: number,
): Promise<ClientResponse<CreateProductVariantResponse>> =>
  client.request(Products.CreateVariant, {
    variables: {
      productId,
      variants: [
        {
          price,
        },
      ],
      productPublishInput: {
        id: productId,
        productPublications: [
          {
            publicationId: 'gid://shopify/Publication/133671125049',
          },
          {
            publicationId: 'gid://shopify/Publication/134429769785',
          },
          {
            publicationId: 'gid://shopify/Publication/135087751225',
          },
        ],
      },
    },
  })

export default {
  addProductToSellingPlan,
  createProduct,
  createProductVariant,
}
