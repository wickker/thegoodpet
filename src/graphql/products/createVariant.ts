export default `
mutation ($input: ProductVariantInput!) {
  productVariantCreate(input: $input) {
    product {
      id
      title
    }
    productVariant {
      createdAt
      displayName
      id
      price
      product {
        id
      }
      title
    }
    userErrors {
      field
      message
    }
  }
}
`
