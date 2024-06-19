import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import Products from '@/graphql/products';
import Config from '@/configs';

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.VITE_SHOPIFY_API_VERSION,
  publicAccessToken: Config.VITE_SHOPIFY_PUBLIC_ACCESS_TOKEN,
});

// GET
// TODO: Convert to proper pagination in the future 
const getAllProducts = (first: number = 100) =>
  client.request(Products.GetAll, {
    variables: {
      first,
    },
  }).then((res) => res.data.products.nodes)


const StorefrontApi = {
    getAllProducts
}  

export default StorefrontApi