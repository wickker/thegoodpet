const Config = {
  SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  SHOPIFY_API_VERSION: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '',
  SHOPIFY_PUBLIC_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
  DB_URL: process.env.DB_URL || '',
  ENV: process.env.NEXT_PUBLIC_ENV || '',
}

export default Config
