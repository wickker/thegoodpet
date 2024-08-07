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

export type GetProductVariantResponse = {
  productVariant: {
    createdAt: string
    displayName: string
    id: string
    price: string
    selectedOptions: Array<{
      name: string
      optionValue: {
        id: string
        name: string
      }
      value: string
    }>
    product: {
      id: string
      title: string
      description: string
    }
    title: string
  }
}
