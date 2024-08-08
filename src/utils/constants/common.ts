export const Colors = {
  primary: '#0D6326',
  secondary: '#14433D',
  background: '#FFF7E5',
} as const

export type Colors = (typeof Colors)[keyof typeof Colors]

export const SHOPIFY_CUSTOM_MEAL_PRODUCT_ID =
  'gid://shopify/Product/7660723535929'

export const SHOPIFY_CUSTOM_MEAL_SELLING_PLANS = [
  {
    name: 'Delivery every 2 weeks, 10% off',
    value: 'gid://shopify/SellingPlan/5732368441',
  },
  {
    name: 'Delivery every month, 10% off',
    value: 'gid://shopify/SellingPlan/5760483385',
  },
]
