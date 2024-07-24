import {
  CustomerAccessTokenCreatePayload,
} from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

// TODO: Refactor all to proxy pass
const useCustomer = () => {
  const useCreateCustomerAccessTokenMutation = (
    onSuccess: (data: CustomerAccessTokenCreatePayload) => void,
  ) =>
    useMutation({
      mutationFn: storefrontApi.createCustomerAccessToken,
      onSuccess,
    })

  const useGetCustomerOrdersQuery = (
    accessToken: string,
    limit: number = 100,
  ) => {
    const request = { first: limit }
    return useQuery({
      queryKey: QUERY_KEYS.GET_CUSTOMER_ORDERS(request),
      queryFn: () => storefrontApi.getCustomerOrders(accessToken, request),
    })
  }

  return {
    useCreateCustomerAccessTokenMutation,
    useGetCustomerOrdersQuery,
  }
}

export default useCustomer
