'use client'

import { PropsWithChildren, useState } from 'react'
import { Loader } from '@/components/common'
import { mc } from '@/utils/functions/common'

type ButtonProps = {
  width?: string
  onClick?: () => void
  disabled?: boolean
  isLoading?: boolean
  minLoadDuration?: number
}

export default function Button({
  children,
  width,
  disabled = false,
  onClick,
  isLoading = false,
  minLoadDuration = 0,
}: ButtonProps & PropsWithChildren) {
  const [isLoadingLock, setIsLoadingLock] = useState(false)

  const handleClick = () => {
    if (isLoading || isLoadingLock || disabled) return

    if (minLoadDuration) {
      setIsLoadingLock(true)
    }

    onClick && onClick()

    if (minLoadDuration) {
      setTimeout(function () {
        setIsLoadingLock(false)
      }, minLoadDuration)
    }
  }

  return (
    <button
      className={mc(
        'flex w-fit items-center gap-x-2 rounded-full bg-primary px-7 py-2.5 text-lg text-white transition-all',
        width,
        !disabled && `hover:scale-105 hover:bg-secondary`,
        disabled && `cursor-not-allowed opacity-50`,
        { 'cursor-wait': isLoading || isLoadingLock },
      )}
      onClick={handleClick}
    >
      {(isLoading || isLoadingLock) && <Loader size="sm" />}
      {children}
    </button>
  )
}
