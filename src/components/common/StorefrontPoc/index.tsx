'use client' // required for react query

import useProduct from '@/hooks/query/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()

  return (
    <p className="bg-green-400">
      {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
    </p>
  )
}
