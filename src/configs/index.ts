const Config = {
  DB_URL: process.env.DB_URL || '',
  ENV: process.env.NEXT_PUBLIC_ENV || '',
  SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
  SHOPIFY_PUBLIC_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
  SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
}

export default Config
