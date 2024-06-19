// import { useEffect, useState } from 'react';
import './App.css';
// import { createStorefrontApiClient } from '@shopify/storefront-api-client';

// const client = createStorefrontApiClient({
//   storeDomain: 'd2ac44-d5.myshopify.com',
//   apiVersion: '2024-04',
//   publicAccessToken: '9345c9692f79f9b62ed605a9758e875a',
// });

function App() {
  // const [response, setResponse] = useState<string>('');

  // const shopQuery = `
  // query shop {
  //   shop {
  //     name
  //     id
  //   }
  // }`;

 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await client.request(productsQuery, {
  //       variables: {
  //         first: 10,
  //       },
  //     });
  //     setResponse(JSON.stringify(res));
  //   };

  //   fetchData();
  // });

  return (
    <>
      <p>Hello World</p>
      <p>{response}</p>
    </>
  );
}

export default App;
