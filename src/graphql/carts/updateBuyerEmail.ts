export default `
mutation ($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
  cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        email
      }
    }
    userErrors {
      code
      field
      message
    }
  }
}
`
