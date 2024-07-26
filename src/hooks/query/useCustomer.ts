import { useQuery } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

// TODO: Refactor all to proxy pass
const useCustomer = () => {
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
    useGetCustomerOrdersQuery,
  }
}

export default useCustomer
