import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export const capitalize = (str: string) => {
  if (str.length === 0) return ''
  if (str.length === 1) return str[0].toUpperCase()
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function isZodError(err: unknown): err is ZodError {
  return Boolean(
    err && (err instanceof ZodError || (err as ZodError).name === 'ZodError'),
  )
}

export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))

export const formatPriceString = (
  price?: string | null,
  quantity: number = 1,
) => {
  if (!price) return null
  return (parseInt(price, 10) * quantity).toFixed(2)
}
