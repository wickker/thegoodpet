import { createStorefrontApiClient } from '@shopify/storefront-api-client';
// import Products from '../../graphql/products';
import products from '@/graphql/products';

const client = createStorefrontApiClient({
  // TODO: Convert to env vars  
  storeDomain: 'd2ac44-d5.myshopify.com',
  apiVersion: '2024-04',
  publicAccessToken: '9345c9692f79f9b62ed605a9758e875a',
});

// GET
const getProducts = client.request(Products.GetAll)