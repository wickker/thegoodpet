'use client' // required for react query

import { useRouter } from 'next/navigation'
import useProduct from '@/hooks/query/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()
  const router = useRouter()

  return (
    <>
      <p className="text-purple-600">
        {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
      </p>
      <button
        className="m-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm text-white"
        onClick={() => router.push('/api/login')}
      >
        Shopify Login
      </button>
    </>
  )
}
