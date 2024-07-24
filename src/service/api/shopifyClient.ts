import { createAdminRestApiClient } from '@shopify/admin-api-client'
import Config from '@/configs'

const client = createAdminRestApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: '2024-10',
  accessToken: Config.SHOPIFY_ADMIN_ACCESS_TOKEN,
})

export default client
