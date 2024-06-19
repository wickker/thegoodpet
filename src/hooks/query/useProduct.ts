import storefrontApi from '@/service/api/storefrontApi';
import { QUERY_KEYS } from '@/utils/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useProduct = () => {
  const useGetAllProductsQuery = (limit: number = 100) => {
    const request = { first: limit };
    return useQuery({
      queryKey: QUERY_KEYS.GET_ALL_PRODUCTS(request),
      queryFn: () => storefrontApi.getAllProducts(request),
    });
  };

  return {
    useGetAllProductsQuery,
  };
};

export default useProduct;
