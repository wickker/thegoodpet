import { createAdminApiClient } from '@shopify/admin-api-client'
import Config from '@/configs'
import Products from '@/graphql/products'

const client = createAdminApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  accessToken: Config.SHOPIFY_ADMIN_ACCESS_TOKEN,
})

const createProduct = (title: string, descriptionHtml: string) =>
  client.request(Products.Create, {
    variables: {
      input: {
        title,
        descriptionHtml,
      },
    },
  })

export default {
  createProduct,
}
