'use client'

import { PropsWithChildren, createContext, useState, useEffect } from 'react'
import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { UseQueryResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import useCart from '@/hooks/storefrontQuery/useCart'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'

type CartContextSchema = {
  isCartOpen: boolean
  closeCart: () => void
  openCart: () => void
  getCart?: UseQueryResult<Cart, Error>
}

export const CartContext = createContext<CartContextSchema>({
  isCartOpen: false,
  closeCart: () => {},
  openCart: () => {},
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartId] = useState(Cookies.get(SHOPIFY_CART_ID_COOKIE))

  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery(cartId)

  const openCart = () => setIsCartOpen(true)

  const closeCart = () => setIsCartOpen(false)

  useEffect(() => {
    if (!cartId) {
      // TODO:
      // check if customer is logged in
      // if so, query DB for cartId and set cookie
      // if not, create new cart and set cookie
    }
  }, [cartId])

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, getCart }}>
      {children}
    </CartContext.Provider>
  )
}
