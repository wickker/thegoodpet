import { Cart } from '@shopify/hydrogen-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useCart = () => {
  const useCreateCartMutation = (onSuccess?: (data: Cart) => void) =>
    useMutation({
      mutationFn: storefrontApi.createCart,
      onSuccess,
    })

  const useGetCartQuery = (cartId?: string) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CART(cartId),
      queryFn: () => storefrontApi.getCart(cartId),
      enabled: !!cartId,
    })

  const useUpdateCartQuantityMutation = (onSuccess?: (data: Cart) => void) =>
    useMutation({
      mutationFn: storefrontApi.updateCartItemQuantity,
      onSuccess,
    })

  return {
    useCreateCartMutation,
    useGetCartQuery,
    useUpdateCartQuantityMutation,
  }
}

export default useCart
