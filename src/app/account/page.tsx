import { Customer } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { OrderHistoryTile } from '@/components/Account'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '@/utils/constants/cookies'

export default async function Account() {
  const tokenCookie = cookies().get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  if (!tokenCookie) {
    return (
      <div className="flex h-[calc(100dvh-122px)] flex-col items-center justify-center text-neutral-500">
        Please login
      </div>
    )
  }

  const customerRes = await storefrontApi.getCustomer(tokenCookie.value, {
    first: 100,
  })
  if (customerRes.errors) {
    return (
      <div className="flex h-[calc(100dvh-122px)] flex-col items-center justify-center text-neutral-500">
        {customerRes.errors.message}
      </div>
    )
  }
  const customer = customerRes.data?.customer as Customer

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-fredoka text-4xl font-medium text-secondary">
            Account
          </h1>
          <button className="text-primary underline">Logout</button>
        </div>

        <div className="mb-10">{customer.email}</div>

        <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
          Order History
        </h1>

        {customer.orders.edges.map((order) => (
          <OrderHistoryTile order={order.node} key={order.node.id} />
        ))}

        {/* TODO: Remove this later */}
        {/* <div>{JSON.stringify(customer)}</div> */}
      </div>
    </div>
  )
}
