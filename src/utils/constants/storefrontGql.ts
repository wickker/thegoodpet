export const StorefrontDataKey = {
  CUSTOMER_ACCESS_TOKEN_CREATE: 'customerAccessTokenCreate',
  CART_BUYER_IDENTITY_UPDATE: 'cartBuyerIdentityUpdate',
} as const

export type StorefrontDataKeys =
  (typeof StorefrontDataKey)[keyof typeof StorefrontDataKey]

export const StorefrontErrorKey = {
  CUSTOMER_USER_ERRORS: 'customerUserErrors',
  USER_ERRORS: 'userErrors',
} as const

export type StorefrontErrorKeys =
  (typeof StorefrontErrorKey)[keyof typeof StorefrontErrorKey]
