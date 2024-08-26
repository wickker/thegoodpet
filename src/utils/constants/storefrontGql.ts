export const StorefrontDataKey = {
  CART_BUYER_IDENTITY_UPDATE: 'cartBuyerIdentityUpdate',
  CART_CREATE: 'cartCreate',
  CART_LINES_ADD: 'cartLinesAdd',
  CART_LINES_REMOVE: 'cartLinesRemove',
  CART_LINES_UPDATE: 'cartLinesUpdate',
  CUSTOMER_ACCESS_TOKEN_CREATE: 'customerAccessTokenCreate',
  CUSTOMER_CREATE: 'customerCreate',
  CUSTOMER_RECOVER: 'customerRecover',
} as const

export type StorefrontDataKeys =
  (typeof StorefrontDataKey)[keyof typeof StorefrontDataKey]

export const StorefrontErrorKey = {
  CUSTOMER_USER_ERRORS: 'customerUserErrors',
  USER_ERRORS: 'userErrors',
} as const

export type StorefrontErrorKeys =
  (typeof StorefrontErrorKey)[keyof typeof StorefrontErrorKey]
