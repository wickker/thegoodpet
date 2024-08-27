export const Route = {
  ACCOUNT: '/account',
  ACCOUNT_SETUP: '/account-setup',
  CUSTOM_MEALS: '/custom-meals',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  LEARN: '/',
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password',
  SHOP: '/',
  SUBSCRIBE: '/',
  SURVEY: '/survey',
} as const

export type Route = (typeof Route)[keyof typeof Route]
