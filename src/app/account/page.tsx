import { cookies } from 'next/headers'
import { OrderHistoryTile, LogoutForm } from '@/components/Account'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '@/utils/constants/cookies'

export default async function AccountPage() {
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
  if (customerRes.errors || !customerRes.data?.customer) {
    return (
      <div className="flex h-[calc(100dvh-122px)] flex-col items-center justify-center text-neutral-500">
        Failed to get customer: {customerRes.errors?.message}.
      </div>
    )
  }
  const customer = customerRes.data.customer

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <div className="w-full">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="font-fredoka text-4xl font-medium text-secondary">
            Account
          </h1>
          <LogoutForm />
        </div>

        <div className="mb-10">{customer.email}</div>

        <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
          Order History
        </h1>

        {customer.orders.edges.map((order) => (
          <OrderHistoryTile order={order.node} key={order.node.id} />
        ))}

        <div className="py-5 text-center">
          Need to make changes to your order?{' '}
          <a
            href="mailto:nicolas@thegoodpet.co"
            className="block text-primary underline md:inline"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  )
}
