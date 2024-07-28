'use client'

import { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { mc } from '@/utils/functions/common'

export default function OrderHistoryTile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <>
      <div className="h-[100px] w-full bg-purple-400">
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
