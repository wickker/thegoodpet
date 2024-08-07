import { ClientResponse, createAdminApiClient } from '@shopify/admin-api-client'
import { DateTime } from 'luxon'
import {
  CreateProductVariantResponse,
  GetProductVariantResponse,
} from '@/@types/product'
import Config from '@/configs'
import Products from '@/graphql/products'
import { SHOPIFY_CUSTOM_MEAL_PRODUCT_ID } from '@/utils/constants/common'

const client = createAdminApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  accessToken: Config.SHOPIFY_ADMIN_ACCESS_TOKEN,
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
        productId: SHOPIFY_CUSTOM_MEAL_PRODUCT_ID,
        options: [DateTime.now().toISO(), petName, variantOption],
        inventoryQuantities: {
          availableQuantity: 10,
          locationId: 'gid://shopify/Location/73449472057',
        },
      },
    },
  })

const getProductVariant = (
  id: string,
): Promise<ClientResponse<GetProductVariantResponse>> =>
  client.request(Products.GetVariant, {
    variables: {
      id,
    },
  })

export default {
  createProductVariant,
  getProductVariant,
}
