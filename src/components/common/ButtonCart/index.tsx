import { BsCartFill } from 'react-icons/bs'

type ButtonCartProps = {
  onClick?: () => void
  itemsCount?: number
}

export default function ButtonCart({ onClick, itemsCount }: ButtonCartProps) {
  return (
    <button className="relative text-[25px]" onClick={onClick}>
      {!!itemsCount && (
        <div className="absolute -right-2 -top-2 flex aspect-square min-w-[20px] items-center justify-center rounded-full bg-[#F4C143] text-[10px]">
          {itemsCount}
        </div>
      )}
      <BsCartFill />
    </button>
  )
}
