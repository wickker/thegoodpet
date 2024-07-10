'use client'

import { useContext } from 'react'
import { CartContext } from '@/contexts/CartProvider'
import { mc } from '@/utils/functions/common'

export default function Cart() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext)

  const closeCart = () => setIsCartOpen(false)

  return (
    <>
      <div
        className={mc(
          'transition-bg-opacity fixed inset-0 -z-10 bg-black bg-opacity-0',
          isCartOpen && 'z-10 bg-opacity-70',
        )}
        onClick={closeCart}
      />
      <div
        className={mc(
          'fixed right-0 z-20 h-full w-[480px] translate-x-[480px] bg-white transition-transform',
          isCartOpen && 'translate-x-0 min-[0px]:w-full min-[480px]:w-[480px]',
        )}
      >
        <button onClick={closeCart}>Close Cart</button>
      </div>
    </>
  )
}
