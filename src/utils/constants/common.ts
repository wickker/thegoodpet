export const Colors = {
  primary: '#0D6326',
  secondary: '#14433D',
  background: '#FFF7E5',
} as const

export type Colors = (typeof Colors)[keyof typeof Colors]
