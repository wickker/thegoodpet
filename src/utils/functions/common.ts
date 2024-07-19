import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'

export const capitalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export function isZodError(err: unknown): err is ZodError {
  return Boolean(
    err && (err instanceof ZodError || (err as ZodError).name === 'ZodError'),
  )
}

export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))
