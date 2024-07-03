import { PropsWithChildren } from 'react'
import { Loader } from '@/components/common'
import { mc } from '@/utils/functions/common'

type ButtonProps = {
  width?: string
  onClick?: () => void
  disabled?: boolean
}

export default function Button({
  children,
  width,
  disabled,
  onClick,
}: ButtonProps & PropsWithChildren) {
  return (
    <button
      className={mc(
        'flex w-fit items-center gap-x-2 rounded-full bg-primary px-7 py-2.5 text-lg text-white transition-all',
        width,
        !disabled && `hover:scale-105 hover:bg-secondary`,
        disabled && `cursor-not-allowed opacity-50`,
      )}
      onClick={onClick}
    >
      <Loader size="sm" />
      {children}
    </button>
  )
}
