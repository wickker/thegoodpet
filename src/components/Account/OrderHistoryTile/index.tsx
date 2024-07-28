'use client'

import { useState } from 'react'
import { Order } from '@shopify/hydrogen-react/storefront-api-types'
import { BsChevronDown } from 'react-icons/bs'
import { mc } from '@/utils/functions/common'

type OrderHistoryTileProps = {
  order: Order
}

export default function OrderHistoryTile({ order }: OrderHistoryTileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  //   const getTotalPrice = () => {
  //     if (order.lineItems.nodes)
  //   }

  return (
    <>
      <div className="h-[100px] w-full bg-purple-400">
        <p>{order.processedAt}</p>
        <p>{order.orderNumber}</p>
        <br />
        <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
          <BsChevronDown
            className={mc(
              'transition-transform',
              isDropdownOpen && 'rotate-180',
            )}
          />
        </button>
      </div>
      <div
        className={mc(
          'h-[100px] max-h-0 bg-yellow-400 transition-[max_height]',
          isDropdownOpen && 'max-h-[100px]',
        )}
      ></div>
    </>
  )
}
