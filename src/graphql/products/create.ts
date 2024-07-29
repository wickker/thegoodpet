export default `
mutation ($input: ProductInput!) {
  productCreate(input: $input) {
    product {
      id
    }
  }
}
`
