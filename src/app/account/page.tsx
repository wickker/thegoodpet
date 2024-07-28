import { Customer } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { OrderHistoryTile } from '@/components/Account'
import { FormErrorMessage } from '@/components/common'
import storefrontApi from '@/service/api/storefrontApi'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '@/utils/constants/cookies'

export default async function Account() {
  const tokenCookie = cookies().get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  if (!tokenCookie) return
  const customerRes = await storefrontApi.getCustomer(tokenCookie.value, {
    first: 100,
  })
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

        <div className="mb-10">abc@efg.com</div>

        <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
          Order History
        </h1>
        {!!customerRes.errors && (
          <FormErrorMessage
            message={customerRes.errors?.message}
            className="mb-4 text-left"
          />
        )}

        <OrderHistoryTile />

        <div>{JSON.stringify(customer)}</div>
      </div>
    </div>
  )
}
