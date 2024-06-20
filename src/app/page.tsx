'use client'; // required for react query

import useProduct from '@/hooks/query/useProduct';

export default function Page() {
  const { useGetAllProductsQuery } = useProduct();
  const { data } = useGetAllProductsQuery();

  return (
    <>
      <h1>Hello, Next.js!</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
