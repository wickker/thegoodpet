export default `
mutation ($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
    }
    userErrors {
      field
      message
    }
  }
}
`
