'use client' // required for react query

import { useRouter } from 'next/navigation'
import useProduct from '@/hooks/query/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()
  const router = useRouter()

  return (
    <>
      <p className="bg-green-400">
        {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
      </p>
      <button onClick={() => router.push('/api/login')}>Shopify login</button>
    </>
  )
}
