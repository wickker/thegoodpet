export default `
mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!, $channel1: [PublicationInput!]!, $channel2: [PublicationInput!]!, $channel3: [PublicationInput!]!, $sellingPlanId: ID!, $productIds: [ID!]!) {
  productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
    product {
      id
    }
    productVariants {
      id
    }
  }

  salesChannel1: publishablePublish(id: $productId, input: $channel1) {
    publishable {
      publicationCount
    }
  }

  salesChannel2: publishablePublish(id: $productId, input: $channel2) {
    publishable {
      publicationCount
    }
  }

  salesChannel3: publishablePublish(id: $productId, input: $channel3) {
    publishable {
      publicationCount
    }
  }

  sellingPlanGroupAddProducts(id: $sellingPlanId, productIds: $productIds) {
    sellingPlanGroup {
      id
    }
  }
}
`
