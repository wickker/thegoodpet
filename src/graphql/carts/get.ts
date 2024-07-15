export default `
query ($cartId: ID!) {
  cart(id: $cartId) {
    id
    createdAt
    updatedAt
    checkoutUrl
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              image {
                url
              }
            }
          }
          sellingPlanAllocation {
            sellingPlan {
              id
              name
            }
            priceAdjustments {
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              perDeliveryPrice {
                amount
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
    }
    totalQuantity
  }
}
`
