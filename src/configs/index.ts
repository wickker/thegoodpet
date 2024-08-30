const Config = {
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || '',
  DB_URL: process.env.DB_URL || '',
  ENV: process.env.NEXT_PUBLIC_ENV || '',
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
  SHOPIFY_PUBLIC_ACCESS_TOKEN:
    process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
  SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
}

export default Config
