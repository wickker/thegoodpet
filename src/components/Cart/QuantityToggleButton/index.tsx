'use client'

import { useContext, useState } from 'react'
import { BsDash, BsPlus } from 'react-icons/bs'
import { Loader } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import useCart from '@/hooks/query/useCart'

type QuantityToggleButtonProps = {
  cartLineId: string
  quantity: number
}

export default function QuantityToggleButton({
  quantity,
  cartLineId,
}: QuantityToggleButtonProps) {
  const [buttonClicked, setButtonClicked] = useState<'add' | 'minus'>()
  const { getCart } = useContext(CartContext)
  const { useUpdateCartQuantityMutation } = useCart()
  const updateCartQuantity = useUpdateCartQuantityMutation(
    updateCartQuantitySuccessCB,
  )

  function updateCartQuantitySuccessCB() {
    setButtonClicked(undefined)
    getCart?.refetch()
  }

  const mutateCartQuantity = (newQuantity: number) => {
    updateCartQuantity.mutate({
      lines: [
        {
          id: cartLineId,
          quantity: newQuantity,
        },
      ],
    })
  }

  const handleIncreaseQuantity = () => {
    setButtonClicked('add')
    mutateCartQuantity(quantity + 1)
  }

  const handleDecreaseQuantity = () => {
    setButtonClicked('minus')
    mutateCartQuantity(quantity - 1)
  }

  return (
    <div className="flex items-center rounded-sm border border-secondary bg-white px-3 py-1 text-sm">
      <button
        disabled={updateCartQuantity.isPending}
        onClick={handleDecreaseQuantity}
        className="w-4"
      >
        {buttonClicked === 'minus' && updateCartQuantity.isPending ? (
          <Loader size="xs" />
        ) : (
          <BsDash />
        )}
      </button>

      <span className="px-[25px]">{quantity}</span>

      <button
        disabled={updateCartQuantity.isPending}
        onClick={handleIncreaseQuantity}
        className="w-4"
      >
        {buttonClicked === 'add' && updateCartQuantity.isPending ? (
          <Loader size="xs" />
        ) : (
          <BsPlus />
        )}
      </button>
    </div>
  )
}
