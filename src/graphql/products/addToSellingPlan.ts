// TODO: Debug this

export default `
query sellingPlanGroups {
  sellingPlanGroup(id: "gid://shopify/SellingPlanGroup/1543929913") {
    id,
    name,
    merchantCode,
    appId,
    description,
    options,
    position,
    createdAt,
    sellingPlans(first: 5) {
      edges {
        node {
          id
        }
      }
    }
    productVariants(first: 5) {
      edges {
        node {
          id
        }
      }
    }
    summary,
    products(first: 5) {
      edges {
        node {
          id
        }
      }
    }
  }
}
`

// export default `
// mutation productJoinSellingPlanGroups($id: ID!, $sellingPlanGroupIds: [ID!]!) {
//   productJoinSellingPlanGroups(id: $id, sellingPlanGroupIds: $sellingPlanGroupIds) {
//     product {
//       id
//     }
//     userErrors {
//       field
//       message
//     }
//   }
// }
// `
