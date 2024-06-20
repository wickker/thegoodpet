'use client'; // required for react query

import useProduct from '@/hooks/query/useProduct';

export default function Page() {
  const { useGetAllProductsQuery } = useProduct();
  const { data } = useGetAllProductsQuery();
  const a = 'hey yyo';

  return (
    <>
      <h1 className="bg-blue-300">Hello, Next.js!</h1>
      <p>{JSON.stringify(data)}</p>
      <p>{a}</p>
    </>
  );
}
