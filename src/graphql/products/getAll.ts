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
      variants(first: 5) {
        edges {
          node {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
            quantityAvailable
          }
        }
      }
    }
  }
}  
`;
