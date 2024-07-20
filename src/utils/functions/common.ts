import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}
export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))

export const formatPriceString = (
  price?: string | null,
  quantity: number = 1,
) => {
  if (!price) return null
  return (parseInt(price, 10) * quantity).toFixed(2)
}
