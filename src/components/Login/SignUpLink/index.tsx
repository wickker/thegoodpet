'use client'

import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CartContext } from '@/contexts/CartProvider'
import { Route } from '@/utils/constants/routes'

export default function SignUpLink() {
  const { closeCart } = useContext(CartContext)
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin') || ''
  const searchParam = origin ? `?origin=${origin}` : ''

  useEffect(() => {
    if (origin) closeCart()
  }, [origin])

  return (
    <>
      <Link
        href={`${Route.ACCOUNT_SETUP}${searchParam}`}
        className="text-primary underline"
      >
        Sign up
      </Link>

      <input value={origin} name="origin" hidden readOnly />
    </>
  )
}
