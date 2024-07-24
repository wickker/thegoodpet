import { type ClassValue, clsx } from 'clsx'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import Config from '@/configs'

export const capitalize = (str: string) => {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const isZodError = (err: unknown): err is ZodError =>
  Boolean(
    err && (err instanceof ZodError || (err as ZodError).name === 'ZodError'),
  )

export const mc = (...inputs: Array<ClassValue>) => twMerge(clsx(inputs))

export const formatPriceString = (
  price?: string | null,
  quantity: number = 1,
) => {
  if (!price) return null
  return (parseInt(price, 10) * quantity).toFixed(2)
}

export const setCookie = (
  cookieStore: ReadonlyRequestCookies,
  name: string,
  value: string,
  expiry?: Date,
) =>
  cookieStore.set(name, value, {
    httpOnly: true,
    path: '/',
    secure: !(Config.ENV === 'local'),
    expires: expiry,
  })
