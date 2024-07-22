'use client'

import { useContext } from 'react'
import { BsXLg } from 'react-icons/bs'
import { CartTile } from '@/components/Cart'
import { Button, Loader } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import { formatPriceString, mc } from '@/utils/functions/common'

export default function Cart() {
  const { closeCart, isCartOpen, getCart } = useContext(CartContext)
  const hasItems = getCart?.isSuccess && getCart?.data?.lines.edges.length > 0

  const generateCartItems = () => {
    if (hasItems) {
      return getCart.data.lines.edges.map((item) => (
        <CartTile item={item} key={item.node.id} />
      ))
    }
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <p className="mt-2 text-neutral-500">No items yet</p>
      </div>
    )
  }

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
          'fixed right-0 z-20 grid h-full w-[480px] translate-x-[480px] grid-rows-[auto_1fr_auto] bg-background transition-transform',
          isCartOpen && 'translate-x-0 min-[0px]:w-full min-[480px]:w-[480px]',
        )}
      >
        <div className="flex items-center justify-between bg-secondary p-[15px] text-lg text-white">
          Your Cart
          <button className="text-[25px]" onClick={closeCart}>
            <BsXLg />
          </button>
        </div>

        <div className="overflow-y-auto">
          {getCart?.isLoading ? (
            <div className="grid h-full place-items-center text-secondary">
              <Loader />
            </div>
          ) : (
            generateCartItems()
          )}
        </div>

        {hasItems && (
          <div className="w-full bg-[#D6EDDF] p-[15px]">
            <div className="mb-4 flex justify-between text-secondary">
              <p>Subtotal</p>
              <p>
                ${formatPriceString(getCart.data.cost.subtotalAmount.amount)}
                <span className="pl-1">
                  {getCart.data.cost.subtotalAmount.currencyCode}
                </span>
              </p>
            </div>
            <Button width="w-full">Checkout</Button>
          </div>
        )}
      </div>
    </>
  )
}
