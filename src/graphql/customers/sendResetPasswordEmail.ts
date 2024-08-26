export default `
mutation ($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      field
      message
      code
    }
    userErrors {
      field
      message
    }
  }
}
`
