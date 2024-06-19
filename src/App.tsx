import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProduct from './hooks/query/useProduct';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dummy />
    </QueryClientProvider>
  );
}

// TODO: Remove this Dummy component later
function Dummy() {
  const { useGetAllProductsQuery } = useProduct();
  const { data } = useGetAllProductsQuery();

  return (
    <>
      <p>Hello World</p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

export default App;
