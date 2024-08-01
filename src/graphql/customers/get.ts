export default `
query ($customerAccessToken: String!, $first: Int) {
  customer(customerAccessToken: $customerAccessToken) {
    id
    orders(first: $first) {
      edges {
        node {
          orderNumber
          id
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
                image {
                  url
                }
                compareAtPrice {
                  currencyCode
                  amount
                }
                price {
                  amount
                  currencyCode
                }
                barcode
                title
                unitPrice {
                  amount
                  currencyCode
                }
                product {
                  id
                }
              }
            }
          }
        }
      }
      totalCount
    }
    numberOfOrders
    email
    addresses(first: 10) {
      nodes {
        address1
        address2
        country
        firstName
        lastName
        zip
      }
    }
  }
}
`
