import { Cart } from '@shopify/hydrogen-react'
import { useMutation } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'

const useCart = () => {
  const useCreateCartMutation = (onSuccess?: (data: Cart) => void) =>
    useMutation({
      mutationFn: storefrontApi.createCart,
      onSuccess,
    })

  return {
    useCreateCartMutation,
  }
}

export default useCart
