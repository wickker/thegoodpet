import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import Products from '@/graphql/products';
import Config from '@/configs';
import { GetAllProductsRequest } from '@/@types/api/product';
import type { Product } from '@shopify/hydrogen-react/storefront-api-types';

const client = createStorefrontApiClient({
  storeDomain: Config.SHOPIFY_STORE_DOMAIN,
  apiVersion: Config.SHOPIFY_API_VERSION,
  publicAccessToken: Config.SHOPIFY_PUBLIC_ACCESS_TOKEN,
});

// GET
// TODO: Convert to proper pagination in the future
const getAllProducts = (
  request: GetAllProductsRequest,
): Promise<Array<Partial<Product>>> =>
  client
    .request(Products.GetAll, {
      variables: request,
    })
    .then((res) => res.data.products.nodes);

export default {
  getAllProducts,
};
