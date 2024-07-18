import { BsDash, BsPlus } from 'react-icons/bs'

type QuantityToggleButtonProps = {
  cartLineId: string
  quantity: number
}

export default function QuantityToggleButton({
  quantity,
}: QuantityToggleButtonProps) {
  // TODO: Add loaders and onClick handlers
  return (
    <div className="flex items-center rounded-sm border border-secondary bg-white px-3 py-1 text-sm">
      <button>
        <BsDash />
      </button>
      <span className="px-[25px]">{quantity}</span>
      <button>
        <BsPlus />
      </button>
    </div>
  )
}
