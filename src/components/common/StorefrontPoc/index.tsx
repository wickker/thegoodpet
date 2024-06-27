'use client' // required for react query

import { CustomerCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import useCustomer from '@/hooks/storefrontQuery/useCustomer'
import useProduct from '@/hooks/storefrontQuery/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()
  const { useCreateCustomerMutation } = useCustomer()
  const createCustomer = useCreateCustomerMutation(successCB)

  function successCB(data: CustomerCreatePayload) {
    console.log(data)
  }

  return (
    <>
      <p className="text-purple-500">
        {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
      </p>
      <button
        className="m-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
        onClick={() => {
          createCustomer.mutate({
            input: {
              firstName: 'Choy',
              lastName: 'Dian',
              email: 'choydianchun@gmail.com',
              phone: '+6598157820',
              password: 'abc123',
            },
          })
        }}
      >
        {createCustomer.isPending ? 'Loading...' : 'Create user'}
      </button>
    </>
  )
}
