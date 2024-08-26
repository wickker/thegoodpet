import { cookies } from 'next/headers'
import { getProductVariantIdToEncodedPathMap } from './utils'
import { OrderHistoryTile, LogoutForm } from '@/components/Account'
import Surveys from '@/database/dtos/surveys'
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
  const hasOrders = customer.orders.edges.length > 0

  const productVariantIds = customer.orders.edges.flatMap((o) =>
    o.node.lineItems.nodes.map((i) => i.variant?.id || ''),
  )
  let pvIdToMealPathMap = {}
  if (productVariantIds.length > 0) {
    const { data, error } =
      await Surveys.findAllSurveysByProductVariantIds(productVariantIds)
    if (error || !data) {
      return (
        <div className="flex h-[calc(100dvh-122px)] flex-col items-center justify-center text-neutral-500">
          Failed to get custom meal links: {error}.
        </div>
      )
    }
    pvIdToMealPathMap = getProductVariantIdToEncodedPathMap(data)
  }

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

        {hasOrders ? (
          <>
            {customer.orders.edges.map((order) => (
              <OrderHistoryTile
                order={order.node}
                key={order.node.id}
                pvIdToMealPathMap={pvIdToMealPathMap}
              />
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
          </>
        ) : (
          <div className="text-center text-neutral-400">No orders yet</div>
        )}
      </div>
    </div>
  )
}
