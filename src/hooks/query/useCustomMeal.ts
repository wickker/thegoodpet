import { useQuery } from '@tanstack/react-query'
import theGoodPetApi from '@/service/api/theGoodPetApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useCustomMeal = () => {
  const useGetCustomMealQuery = (id: string) =>
    useQuery({
      queryKey: QUERY_KEYS.GET_CUSTOM_MEAL(id),
      queryFn: () => theGoodPetApi.getCustomMeal(id),
    })

  return {
    useGetCustomMealQuery,
  }
}

export default useCustomMeal
