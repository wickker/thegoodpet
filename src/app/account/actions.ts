'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Customers from '@/database/dtos/customers'
import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_EMAIL_COOKIE,
  SHOPIFY_CUSTOMER_TOKEN_COOKIE,
} from '@/utils/constants/cookies'
import { Route } from '@/utils/constants/routes'
import { logger } from '@/utils/functions/logger'

export async function logout(): Promise<undefined | { error: string }> {
  const cookieStore = cookies()
  const emailCookie = cookieStore.get(SHOPIFY_CUSTOMER_EMAIL_COOKIE)
  if (!emailCookie) {
    logger.error('Unable to get customer email cookie.')
    return { error: 'Failed to get customer email cookie' }
  }

  const { error } = await Customers.updateShopifyAccessTokenExpiry(
    emailCookie.value,
  )
  if (error) {
    logger.error(
      `Unable to update customer access token expiry [email: ${emailCookie.value}]: ${error}.`,
    )
    return { error }
  }

  cookieStore.delete(SHOPIFY_CART_ID_COOKIE)
  cookieStore.delete(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  cookieStore.delete(SHOPIFY_CUSTOMER_EMAIL_COOKIE)

  redirect(Route.HOME)
}
