import { ClientResponse } from '@shopify/storefront-api-client'
import { type ClassValue, clsx } from 'clsx'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { twMerge } from 'tailwind-merge'
import { ZodError } from 'zod'
import { SHOPIFY_CUSTOM_MEAL_PRODUCT_ID } from '../constants/common'
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
  if (!price) return ''
  return (parseFloat(price) * quantity).toFixed(2)
}

export const formatVariantTitle = (productId?: string, title?: string) => {
  if (!productId || !title) {
    return title || ''
  }
  if (productId !== SHOPIFY_CUSTOM_MEAL_PRODUCT_ID) {
    return title
  }
  const splits = title.split(' / ')
  splits.shift()
  return splits.join(' / ')
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

export const safeAtob = (
  str: string,
):
  | { success: true; data: string; error: undefined }
  | { success: false; data: undefined; error: unknown } => {
  let data = undefined

  try {
    data = atob(str)
  } catch (error) {
    return {
      success: false,
      data: undefined,
      error,
    }
  }

  return { success: true, data, error: undefined }
}
