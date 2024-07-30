'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '@/utils/constants/cookies'
import { Route } from '@/utils/constants/routes'

export async function handleClickCheckout(checkoutLink: string) {
  const cookieStore = cookies()
  const tokenCookie = cookieStore.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  if (tokenCookie) {
    redirect(checkoutLink)
  }
  redirect(`${Route.LOGIN}?origin=checkout`)
}
