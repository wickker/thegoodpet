'use client'

import { useContext } from 'react'
import { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types'
import { BsDash, BsPlus, BsTrash, BsXLg } from 'react-icons/bs'
import { CartContext } from '@/contexts/CartProvider'
import { mc } from '@/utils/functions/common'

export default function Cart() {
  const { closeCart, isCartOpen, getCart } = useContext(CartContext)

  const getOriginalAndFinalDiscountedPrice = (item: BaseCartLineEdge) => {
    const compareAtPrice = item.node.merchandise.compareAtPrice
    const originalPrice = compareAtPrice
      ? compareAtPrice.amount
      : item.node.merchandise.price.amount
    let discountedPrice: string | null = null
    if (compareAtPrice) {
      discountedPrice = item.node.merchandise.price.amount
    }
    if (item.node.sellingPlanAllocation) {
      discountedPrice =
        item.node.sellingPlanAllocation.priceAdjustments[0].price.amount
    }
    return {
      originalPrice: parsePriceString(originalPrice),
      discountedPrice: parsePriceString(discountedPrice),
    }
  }

  const parsePriceString = (price: string | null) => {
    if (!price) return null
    return parseInt(price, 10).toFixed(2)
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
          {getCart?.data?.lines.edges.map((item) => {
            const { discountedPrice, originalPrice } =
              getOriginalAndFinalDiscountedPrice(item)
            return (
              <div className="border-b border-b-[#E3E3E3] px-[15px] py-2.5">
                <div
                  className="grid grid-cols-[auto_1fr] gap-x-5"
                  key={item.node.id}
                >
                  <div
                    className="aspect-square h-[80px] rounded-full bg-black bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('${item.node.merchandise.image?.url}')`,
                    }}
                  />

                  <div className="min-[0px]:max-w-[calc(100dvw-80px-30px-20px)]">
                    <div className="text-md flex justify-between gap-x-2 text-secondary">
                      <p className="truncate">
                        {item.node.merchandise.product.title}
                      </p>
                      <p>
                        {!!discountedPrice && (
                          <span className="pr-2 line-through">
                            ${originalPrice}
                          </span>
                        )}
                        ${discountedPrice ? discountedPrice : originalPrice}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-x-2 font-light text-secondary">
                      <p className="truncate text-sm">
                        {item.node.merchandise.title}
                      </p>
                      {/* {!!item.node.sellingPlanAllocation && (
                        <p className='text-xs'>
                          {item.node.sellingPlanAllocation.sellingPlan.name}
                        </p>
                      )} */}
                      <div className="flex space-x-1">
                        <div className="min-w-fit rounded-sm bg-[#F5C757] px-3 py-0.5 text-sm">
                          Subscription
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-x-2 text-secondary">
                      <div className="my-1 flex items-center rounded-sm border border-secondary bg-white px-3 py-1 text-sm">
                        <button>
                          <BsDash />
                        </button>
                        <span className="px-[25px]">1</span>
                        <button>
                          <BsPlus />
                        </button>
                      </div>

                      <button className="text-[20px]">
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-2 min-w-fit rounded-sm bg-[#D6EDDF] px-3 py-0.5 text-center text-sm text-secondary">
                  Delivery every 2 weeks
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
