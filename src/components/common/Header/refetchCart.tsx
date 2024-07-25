'use client'

import { useEffect } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'
import { Route } from '@/utils/constants/routes'

type RefetchCartProps = {
  getCart?: UseQueryResult
}

export default function RefetchCart({ getCart }: RefetchCartProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // refetch cart when redirected from login and cart cookie is freshly set
  useEffect(() => {
    const refetchCart = searchParams.get('refetchCart')
    if (refetchCart && pathname === Route.HOME) {
      getCart?.refetch()
    }
  }, [searchParams])

  return <></>
}
