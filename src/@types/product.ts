export type CreateProductResponse = {
  productCreate: {
    product: {
      id: string
    }
  }
}

export type CreateProductVariantResponse = {
  productVariantsBulkCreate: {
    product: {
      id: string
    }
    productVariants: Array<{
      id: string
    }>
  }
}
