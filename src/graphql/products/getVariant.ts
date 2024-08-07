export default `
query ($id: ID!) {
  productVariant(id: $id) {
    createdAt
    displayName
    id
    price
    product {
      id
      title
      description
    }
    title
  }
}
`
