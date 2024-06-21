'use client' // required for react query

import useProduct from '@/hooks/query/useProduct'

export default function Page() {
  const { useGetAllProductsQuery } = useProduct()
  const { data } = useGetAllProductsQuery()

  return (
    <>
      <h1 className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        Hello, Next.js!
      </h1>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}
