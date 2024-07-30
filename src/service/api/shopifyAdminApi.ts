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
        // requiresSellingPlan: true,
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
      productIds: [productId],
      variants: [
        {
          price,
        },
      ],
      channel1: {
        publicationId: 'gid://shopify/Publication/133671125049',
      },
      channel2: {
        publicationId: 'gid://shopify/Publication/134429769785',
      },
      channel3: {
        publicationId: 'gid://shopify/Publication/135087751225',
      },
      sellingPlanId: 'gid://shopify/SellingPlan/5732368441',
    },
  })

export default {
  createProduct,
  createProductVariant,
}
