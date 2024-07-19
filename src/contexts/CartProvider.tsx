'use client'

import { PropsWithChildren, createContext, useState } from 'react'
import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { UseQueryResult } from '@tanstack/react-query'
import useCart from '@/hooks/query/useCart'

type CartContextSchema = {
  isCartOpen: boolean
  closeCart: () => void
  openCart: () => void
  getCart?: UseQueryResult<Cart, Error>
  refetchCart: () => void
}

export const CartContext = createContext<CartContextSchema>({
  isCartOpen: false,
  closeCart: () => {},
  openCart: () => {},
  refetchCart: () => {},
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { useGetCartQuery } = useCart()
  const getCart = useGetCartQuery()

  const openCart = () => setIsCartOpen(true)

  const closeCart = () => setIsCartOpen(false)

  const refetchCart = () => getCart.refetch()

  return (
    <CartContext.Provider
      value={{ isCartOpen, openCart, closeCart, getCart, refetchCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
