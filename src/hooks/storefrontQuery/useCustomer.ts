import { CustomerCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { useMutation } from '@tanstack/react-query'
import storefrontApi from '@/service/api/storefrontApi'

const useCustomer = () => {
  // automatically triggers a 'Customer account confimation' email sent from Shopify
  const useCreateCustomerMutation = (
    onSuccess?: (data: CustomerCreatePayload) => void,
  ) =>
    useMutation({
      mutationFn: storefrontApi.createCustomer,
      onSuccess,
    })

  return {
    useCreateCustomerMutation,
  }
}

export default useCustomer
