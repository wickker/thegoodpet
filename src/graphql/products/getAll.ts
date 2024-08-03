export default `
query ($first: Int) {
  products(first: $first) {
    nodes {
      id
      title
      description
      featuredImage {
        url
      }
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
            quantityAvailable
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            sellingPlanAllocations(first: 10) {
              nodes {
                sellingPlan {
                  id
                  description
                  checkoutCharge {
                    type
                    value
                  }
                  name
                  recurringDeliveries
                  options {
                    name
                    value
                  }
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        __typename
                        adjustmentPercentage
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}  
`
