export default `
mutation ($password: String!, $resetUrl: URL!) {
  customerResetByUrl(password: $password, resetUrl: $resetUrl) {
    customer {
      email
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
    userErrors {
      field
      message
    }
  }
}
`
