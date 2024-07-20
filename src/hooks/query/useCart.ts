import { Cart } from '@shopify/hydrogen-react'
import { CartBase } from '@shopify/hydrogen-react/cart-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'
import theGoodPetApi from '@/service/api/theGoodPetApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

// TODO: Refactor all to proxy pass
const useCart = () => {
  const useCreateCartMutation = (onSuccess?: (data: Cart) => void) =>
    useMutation({
      mutationFn: storefrontApi.createCart,
      onSuccess,
    })

  const useGetCartQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CART,
      queryFn: theGoodPetApi.getCart,
    })

  const useUpdateCartQuantityMutation = (
    onSuccess?: (data: CartBase) => void,
  ) =>
    useMutation({
      mutationFn: theGoodPetApi.updateCartItemQuantity,
      onSuccess,
    })

  const useAddItemToCartMutation = (onSuccess?: (data: CartBase) => void) =>
    useMutation({
      mutationFn: storefrontApi.addItemToCart,
      onSuccess,
    })

  return {
    useAddItemToCartMutation,
    useCreateCartMutation,
    useGetCartQuery,
    useUpdateCartQuantityMutation,
  }
}

export default useCart
