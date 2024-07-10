'use client'

import { PropsWithChildren, createContext, useState } from 'react'

type CartContextSchema = {
  isCartOpen: boolean
  closeCart: () => void
  openCart: () => void
}

export const cartContext = createContext<CartContextSchema>({
  isCartOpen: false,
  closeCart: () => {},
  openCart: () => {},
})

export default function CartProvider({ children }: PropsWithChildren) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)

  const closeCart = () => setIsCartOpen(false)

  return (
    <cartContext.Provider value={{ isCartOpen, openCart, closeCart }}>
      {children}
    </cartContext.Provider>
  )
}
