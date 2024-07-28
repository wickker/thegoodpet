import { Cart } from '@shopify/hydrogen-react'
import { CartBase } from '@shopify/hydrogen-react/cart-types'
import { CartLinesRemovePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation, useQuery } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'
import theGoodPetApi from '@/service/api/theGoodPetApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useCart = () => {
  const useCreateCartMutation = (onSuccess?: (data: Cart) => void) =>
    useMutation({
      // TODO: Refactor to proxy pass
      mutationFn: storefrontApi.createCart,
      onSuccess,
    })

  const useGetCartQuery = () =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CART,
      queryFn: theGoodPetApi.getCart,
    })

  const useUpdateCartQuantityMutation = (
    onSuccess?: (data: CartBase | null) => void,
  ) =>
    useMutation({
      mutationFn: theGoodPetApi.updateCartItemQuantity,
      onSuccess,
    })

  const useAddItemToCartMutation = (
    onSuccess?: (data: CartBase | null) => void,
  ) =>
    useMutation({
      mutationFn: theGoodPetApi.addItemToCart,
      onSuccess,
    })

  const useDeleteItemFromCartMutation = (
    onSuccess?: (data: CartLinesRemovePayload | null) => void,
  ) =>
    useMutation({
      mutationFn: theGoodPetApi.deleteItemFromCart,
      onSuccess,
    })

  return {
    useAddItemToCartMutation,
    useCreateCartMutation,
    useDeleteItemFromCartMutation,
    useGetCartQuery,
    useUpdateCartQuantityMutation,
  }
}

export default useCart
