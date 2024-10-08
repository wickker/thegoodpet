'use client'

import { useEffect, useMemo, useState } from 'react'
import { Order } from '@shopify/hydrogen-react/storefront-api-types'
import { DateTime } from 'luxon'
import { BsChevronDown } from 'react-icons/bs'
import { OrderHistorySubTile } from '@/components/Account'
import { Route } from '@/utils/constants/routes'
import { formatPriceString, mc } from '@/utils/functions/common'

type OrderHistoryTileProps = {
  order: Order
  pvIdToMealPathMap: { [key: string]: string }
}

export default function OrderHistoryTile({
  order,
  pvIdToMealPathMap,
}: OrderHistoryTileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [orderTimestamp, setOrderTimestamp] = useState('')

  const totalItems = useMemo(
    () => order.lineItems.nodes.reduce((acc, curr) => acc + curr.quantity, 0),
    [order.lineItems.nodes],
  )

  useEffect(() => {
    // to prevent text content mismatch during hydration
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
          <div className="grid grid-cols-[1fr_auto] gap-x-2">
            <p className="truncate">{orderTimestamp}</p>
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

      <div
        className={mc(
          'max-h-0 overflow-hidden bg-background transition-[max_height]',
          isDropdownOpen && `max-h-[calc(81px)]`,
        )}
        style={{
          maxHeight: isDropdownOpen
            ? `calc(${order.lineItems.nodes.length}*81px + 60px)`
            : 0,
        }}
      >
        {/* Billing details section */}
        <div className="bg-[#FFFDF7] bg-opacity-50 px-[15px] py-[10px] text-sm text-neutral-400">
          <div className="grid grid-cols-[1fr_auto] gap-x-2">
            <p className="truncate">
              {order.billingAddress?.firstName || ''}{' '}
              {order.billingAddress?.lastName || ''}
            </p>
            <p>{order.billingAddress?.country || ''}</p>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-x-2">
            <p className="truncate">{`${order.billingAddress?.address1 || ''} ${order.billingAddress?.address2 || ''}`}</p>
            <p>{order.billingAddress?.zip || ''}</p>
          </div>
        </div>

        {/* Order items section*/}
        {order.lineItems.nodes.map((item, idx) => {
          const path = pvIdToMealPathMap[item.variant?.id || ''] || ''
          return (
            <OrderHistorySubTile
              item={item}
              key={idx}
              link={`${Route.CUSTOM_MEALS}/${path}`}
            />
          )
        })}
      </div>
    </div>
  )
}
