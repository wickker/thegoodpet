export const Route = {
  ACCOUNT: '/account',
  ACCOUNT_SETUP: '/account-setup',
  HOME: '/',
  LEARN: '/',
  LOGIN: '/login',
  SHOP: '/',
  SUBSCRIBE: '/',
} as const

export type Route = (typeof Route)[keyof typeof Route]
