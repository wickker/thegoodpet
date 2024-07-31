import { useContext } from 'react'
import { BaseCartLineEdge } from '@shopify/hydrogen-react/storefront-api-types'
import { BsTrash } from 'react-icons/bs'
import { QuantityToggleButton } from '@/components/Cart'
import { Loader } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import useCart from '@/hooks/query/useCart'
import { formatPriceString, formatVariantTitle } from '@/utils/functions/common'

type CartTileProps = {
  item: BaseCartLineEdge
}

export default function CartTile({ item }: CartTileProps) {
  const { getCart } = useContext(CartContext)
  const { useDeleteItemFromCartMutation } = useCart()
  const deleteItemFromCart = useDeleteItemFromCartMutation(() =>
    getCart?.refetch(),
  )

  const getOriginalAndDiscountedPrice = (item: BaseCartLineEdge) => {
    const quantity = item.node.quantity
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
      originalPrice: formatPriceString(originalPrice, quantity),
      discountedPrice: formatPriceString(discountedPrice, quantity),
    }
  }

  const computeTags = (item: BaseCartLineEdge) => {
    const tags: Array<string> = []
    if (item.node.merchandise.compareAtPrice) {
      tags.push('Sale')
    }
    if (item.node.sellingPlanAllocation) {
      tags.push('Subscription')
    }
    return tags
  }

  const { discountedPrice, originalPrice } = getOriginalAndDiscountedPrice(item)

  const handleDeleteItem = (cartLineId: string) =>
    deleteItemFromCart.mutate({
      lineIds: [cartLineId],
    })

  return (
    <div className="border-b border-b-[#E3E3E3] px-[15px] py-2.5">
      <div className="grid grid-cols-[auto_1fr] gap-x-5">
        <div
          className="aspect-square h-[80px] rounded-full bg-black bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${item.node.merchandise.image?.url}')`,
          }}
        />

        <div>
          <div className="text-md grid grid-cols-[1fr_auto] gap-x-2 text-secondary">
            <p className="truncate">{item.node.merchandise.product.title}</p>
            <p>
              {!!discountedPrice && (
                <span className="pr-2 line-through">${originalPrice}</span>
              )}
              ${discountedPrice ? discountedPrice : originalPrice}
            </p>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-x-2 font-light text-secondary">
            {/* TODO: Link this to product details listing*/}
            <p className="truncate text-sm">
              {formatVariantTitle(
                item.node.merchandise.product.id,
                item.node.merchandise.title,
              )}
            </p>
            <div className="flex space-x-1">
              {computeTags(item).map((tag) => (
                <div className="min-w-fit rounded-sm bg-[#F5C757] px-3 py-0.5 text-sm">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between gap-x-2 text-secondary">
            <QuantityToggleButton
              cartLineId={item.node.id}
              quantity={item.node.quantity}
            />
            <button
              className="text-[18px]"
              onClick={() => handleDeleteItem(item.node.id)}
              disabled={deleteItemFromCart.isPending}
            >
              {deleteItemFromCart.isPending ? (
                <Loader size="sm" />
              ) : (
                <BsTrash />
              )}
            </button>
          </div>
        </div>
      </div>

      {!!item.node.sellingPlanAllocation && (
        <div className="mt-2 min-w-fit rounded-sm bg-[#E8E0DC] px-3 py-0.5 text-center text-sm text-secondary">
          {item.node.sellingPlanAllocation.sellingPlan.name}
        </div>
      )}
    </div>
  )
}
