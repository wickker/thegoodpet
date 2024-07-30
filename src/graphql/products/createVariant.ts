export default `
mutation ($productId: ID!, $variants: [ProductVariantsBulkInput!]!, $productPublishInput: ProductPublishInput!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
    product {
      id
    }
    productVariants {
      id
    }
  }
  productPublish(input: $productPublishInput) {
    product {
      id
    }
    productPublications {
      channel {
        id
        name
      }
    }
  }
}
`
