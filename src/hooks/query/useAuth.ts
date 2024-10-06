import { useQuery } from '@tanstack/react-query'
import theGoodPetApi from '@/service/api/theGoodPetApi'
import { QUERY_KEYS } from '@/utils/constants/queryKeys'

const useAuth = () => {
  const useGetLoggedInUserQuery = () =>
    useQuery({
      queryKey: [QUERY_KEYS.GET_LOGGED_IN_USER],
      queryFn: theGoodPetApi.getLoggedInUser,
    })

  return {
    useGetLoggedInUserQuery,
  }
}

export default useAuth
