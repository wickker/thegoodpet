'use client'

import useCustomer from '@/hooks/storefrontQuery/useCustomer'
import useProduct from '@/hooks/storefrontQuery/useProduct'

export default function StorefrontPoc() {
  const { useGetAllProductsQuery } = useProduct()
  const { data, isLoading } = useGetAllProductsQuery()
  const { useCreateCustomerMutation, useCreateCustomerAccessTokenMutation } =
    useCustomer()
  const createCustomer = useCreateCustomerMutation((d) =>
    console.log('Customer : ', d),
  )
  const createAccessToken = useCreateCustomerAccessTokenMutation((d) =>
    console.log('Access Token : ', d),
  )

  return (
    <>
      <p className="text-purple-500">
        {isLoading ? 'Storefront data is loading...' : JSON.stringify(data)}
      </p>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() => {
          createCustomer.mutate({
            firstName: 'Choy',
            lastName: 'Dian',
            email: 'choydianchun@gmail.com',
            phone: '+6598157820',
            password: 'abc123',
            acceptsMarketing: true,
          })
        }}
      >
        {createCustomer.isPending ? 'Loading...' : 'Create User'}
      </button>

      <button
        className="m-2 rounded-full bg-blue-700 px-5 py-2.5 text-white"
        onClick={() => {
          createAccessToken.mutate({
            email: 'choydianchun@gmail.com',
            password: 'abc123',
          })
        }}
      >
        {createAccessToken.isPending ? 'Loading...' : 'Create Access Token'}
      </button>
    </>
  )
}
