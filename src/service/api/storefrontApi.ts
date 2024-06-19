import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import Products from '@/graphql/products';
import Config from '@/configs';
import { GetAllProductsRequest } from '@/@types/api/product';

const client = createStorefrontApiClient({
  storeDomain: Config.VITE_SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.VITE_SHOPIFY_API_VERSION,
  publicAccessToken: Config.VITE_SHOPIFY_PUBLIC_ACCESS_TOKEN,
});

// GET
// TODO: Convert to proper pagination in the future
const getAllProducts = (request: GetAllProductsRequest) =>
  client
    .request(Products.GetAll, {
      variables: request,
    })
    .then((res) => res.data.products.nodes);

export default {
  getAllProducts,
};
