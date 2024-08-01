export type CreateProductResponse = {
  productCreate: {
    product: {
      id: string
    }
    userError: {
      field: string
      message: string
    }
  }
}

export type CreateProductVariantResponse = {
  productVariantCreate: {
    product: {
      id: string
    }
    productVariant: {
      createdAt: string
      displayName: string
      id: string
      price: number
      product: {
        id: string
      }
      title: string
    }
    userError: {
      field: string
      message: string
    }
  }
}
