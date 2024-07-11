'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import Config from '@/configs'
import Carts from '@/graphql/carts'

export const getCart = async () => {
  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get('cartId')

  if (!cartIdCookie) return 
  // TODO: Check if exists in DB. If yes, set cookie. If no, create cart, set cookie, update DB if customer is logged in.

  const res = await fetch(
    `https://${Config.SHOPIFY_STORE_DOMAIN}/api/${Config.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query: Carts.Get,
        variables: { cartId: cartIdCookie.value },
      }),
      next: { tags: ['cart'] }
    } as RequestInit
  ).then((res) => res.json())

  return res
}

export const revalidateCart = () => {
    revalidateTag('cart')
}
