import { OrderLineItem } from '@shopify/hydrogen-react/storefront-api-types'
import { formatPriceString, formatVariantTitle } from '@/utils/functions/common'

type OrderHistorySubTileProps = {
  item: OrderLineItem
  link: string
}

export default function OrderHistorySubTile({
  link,
  item,
}: OrderHistorySubTileProps) {
  const getDisplayPrice = () => {
    if (
      item.variant?.sellingPlanAllocations?.nodes[0]?.priceAdjustments?.[0]
        ?.price.amount
    ) {
      return item.variant.sellingPlanAllocations.nodes[0].priceAdjustments[0]
        .price.amount
    }
    return item.variant?.price.amount
  }

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 border-b border-neutral-200 p-[15px] md:grid-cols-[auto_2fr_1fr_auto]">
      <div
        className="aspect-square h-[50px] rounded-full bg-black bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${item.variant?.image?.url}')`,
        }}
      />

      <div className="overflow-hidden">
        <a className="block truncate text-primary underline" href={link}>
          {item.title}
        </a>
        <p className="truncate text-neutral-400">
          {formatVariantTitle(item.variant?.product.id, item.variant?.title)}
        </p>
      </div>

      <p className="hidden md:block">x{item.quantity}</p>

      <div className="text-right">
        <p className="md:hidden">x{item.quantity}</p>
        <p className="text-secondary">
          ${formatPriceString(getDisplayPrice())}
        </p>
      </div>
    </div>
  )
}
