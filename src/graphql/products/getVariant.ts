export default `
query ($id: ID!) {
  productVariant(id: $id) {
    createdAt
    displayName
    id
    price
    selectedOptions {
      name
      optionValue {
        id
        name
      }
      value
    }
    product {
      id
      title
      description
    }
    title
  }
}
`
