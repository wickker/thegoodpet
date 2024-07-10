'use client'

import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useState,
  } from 'react'
  
  type CartContextInterface = {
    isCartOpen: boolean
    setIsCartOpen: Dispatch<SetStateAction<boolean>>
  }
  
  export const CartContext = createContext<CartContextInterface>({
    isCartOpen: false,
    setIsCartOpen: () => {},
  })
  
  export default function CartProvider({ children }: PropsWithChildren) {
    const [isCartOpen, setIsCartOpen] = useState(false)
  
    return (
      <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
        {children}
      </CartContext.Provider>
    )
  }
  