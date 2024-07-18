'use client'

import { useContext } from 'react'
import { BsXLg } from 'react-icons/bs'
import { CartTile } from '@/components/Cart'
import { CartContext } from '@/contexts/CartProvider'
import { mc } from '@/utils/functions/common'

export default function Cart() {
  const { closeCart, isCartOpen, getCart } = useContext(CartContext)

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
          'fixed right-0 z-20 h-full w-[480px] translate-x-[480px] bg-background transition-transform',
          isCartOpen && 'translate-x-0 min-[0px]:w-full min-[480px]:w-[480px]',
        )}
      >
        <div className="flex items-center justify-between bg-secondary p-[15px] text-lg text-white">
          Your Cart
          <button className="text-[25px]" onClick={closeCart}>
            <BsXLg />
          </button>
        </div>

        <div>
          {getCart?.data?.lines.edges.map((item) => <CartTile item={item} />)}
        </div>
      </div>
    </>
  )
}
