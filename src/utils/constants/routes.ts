export const Route = {
  ACCOUNT: '/account',
  ACCOUNT_SETUP: '/account-setup',
  CUSTOM_MEALS: '/custom-meals',
  HOME: '/',
  LEARN: '/',
  LOGIN: '/login',
  SHOP: '/',
  SUBSCRIBE: '/',
  SURVEY: '/survey',
} as const

export type Route = (typeof Route)[keyof typeof Route]
