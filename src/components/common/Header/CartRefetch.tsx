'use client'

import { useEffect } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'
import { Route } from '@/utils/constants/routes'

type CartRefetchProps = {
  getCart?: UseQueryResult
}

export default function CartRefetch({ getCart }: CartRefetchProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // refetch cart when redirected from login and cart cookie is freshly set
  useEffect(() => {
    const refetchCart = searchParams.get('refetchCart')
    if (refetchCart && pathname === Route.HOME && getCart) {
      getCart.refetch()
    }
  }, [searchParams])

  return <></>
}
