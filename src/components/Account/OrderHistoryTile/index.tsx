'use client'

import { useEffect, useMemo, useState } from 'react'
import { Order } from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { BsChevronDown } from 'react-icons/bs'
import { formatPriceString, mc } from '@/utils/functions/common'

type OrderHistoryTileProps = {
  order: Order
}

export default function OrderHistoryTile({ order }: OrderHistoryTileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [orderTimestamp, setOrderTimestamp] = useState('')

  const totalItems = useMemo(
    () => order.lineItems.nodes.reduce((acc, curr) => acc + curr.quantity, 0),
    [order.lineItems.nodes],
  )

  useEffect(() => {
    if (order.processedAt) {
      setOrderTimestamp(
        DateTime.fromISO(order.processedAt).toLocaleString(
          DateTime.DATETIME_MED,
        ),
      )
    }
  }, [order.processedAt])

  return (
    <div className="mb-2">
      <div className="grid w-full grid-cols-[1fr_auto] gap-x-4 border-t border-t-neutral-200 bg-[#FFFDF7] p-[15px]">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between space-x-2">
            <p className="text-lg font-semibold">#{order.orderNumber}</p>
            <p className="text-neutral-400">
              {totalItems} {totalItems > 1 ? 'items' : 'item'}
            </p>
          </div>
          <div className="flex items-center justify-between space-x-2">
            <p>{orderTimestamp}</p>
            <p>${formatPriceString(order.totalPrice.amount)}</p>
          </div>
        </div>

        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="text-[18px] text-primary"
        >
          <BsChevronDown
            className={mc(
              'transition-transform',
              isDropdownOpen && 'rotate-180',
            )}
          />
        </button>
      </div>

      {/* TODO: TBC in next ticket */}
      <div
        className={mc(
          'h-[100px] max-h-0 bg-yellow-400 transition-[max_height]',
          isDropdownOpen && 'max-h-[100px]',
        )}
      ></div>
    </div>
  )
}
