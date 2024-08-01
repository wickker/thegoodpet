import { ClientResponse, createAdminApiClient } from '@shopify/admin-api-client'
import { DateTime } from 'luxon'
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
        requiresSellingPlan: true,
      },
    },
  })

const createProductVariant = (
  petName: string,
  variantOption: string,
  price: number,
): Promise<ClientResponse<CreateProductVariantResponse>> =>
  client.request(Products.CreateVariant, {
    variables: {
      input: {
        price,
        productId: 'gid://shopify/Product/7660723535929',
        options: [DateTime.now().toISO(), petName, variantOption],
        inventoryQuantities: {
          availableQuantity: 10,
          locationId: 'gid://shopify/Location/73449472057',
        },
      },
    },
  })

export default {
  createProduct,
  createProductVariant,
}
