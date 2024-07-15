export default `
query ($customerAccessToken: String!, $first: Int) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    orders(first: $first) {
      edges {
        node {
          orderNumber
          billingAddress {
            address1
            address2
            city
            country
            firstName
            lastName
            zip
          }
          name
          processedAt
          subtotalPrice {
            amount
          }
          totalPrice {
            amount
          }
          totalShippingPrice {
            amount
          }
          lineItems(first: 50) {
            nodes {
              title
              quantity
              variant {
                image {
                  url
                }
                id
                sellingPlanAllocations(first: 10) {
                  nodes {
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
          }
        }
      }
      totalCount
    }
  }
}
`
