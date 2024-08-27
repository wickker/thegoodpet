export default `
mutation ($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      firstName
      lastName
      email
      phone
      id
    }
    customerUserErrors {
      field
      message
      code
    }
  }
}
`
