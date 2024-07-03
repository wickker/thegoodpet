export const Route = {
  SHOP: '/',
  LEARN: '/',
  SUBSCRIBE: '/',
} as const

export type Route = (typeof Route)[keyof typeof Route]
