import { ClientResponse } from '@shopify/storefront-api-client'
import { type ClassValue, clsx } from 'clsx'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import Config from '@/configs'
import {
  StorefrontDataKeys,
  StorefrontErrorKey,
  StorefrontErrorKeys,
} from '@/utils/constants/storefrontGql'

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

export const handleStorefrontGqlResponse = <T>(
  res: ClientResponse,
  dataKey: StorefrontDataKeys,
  errorKey: StorefrontErrorKeys = StorefrontErrorKey.USER_ERRORS,
) => {
  if (res.errors) {
    return { data: null, error: JSON.stringify(res.errors) }
  }
  if (res.data?.[dataKey]?.[errorKey]?.length > 0) {
    return {
      data: null,
      error: JSON.stringify(res.data?.[dataKey]?.[errorKey]),
    }
  }
  return { data: res.data?.[dataKey] as T, error: null }
}
