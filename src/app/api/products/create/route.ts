import { Meat } from '@/@types/common'
import client from '@/service/api/shopifyClient'

export async function POST(request: Request) {
  try {
    const { name, meats } = await request.json()

    if (!meats || meats.length === 0) {
      return Response.json(
        { error: 'Meats preference is required' },
        { status: 400 },
      )
    }

    if (!name) {
      return Response.json({ error: 'Name is required' }, { status: 400 })
    }

    // Prepare product details
    const productData = {
      product: {
        title: `${name}'s Tailor-made meals`,
        body_html: `<strong>Tailor-made meals with the following meats:</strong><br/>${meats.map((meat: Meat) => `${meat.grams} grams of ${meat.type}, ${meat.quantity} packs`).join('<br/>')}`,
        variants: [
          {
            price: 50,
            taxable: false,
          },
        ],
      },
    }

    // Create product in Shopify
    const response = await client.post('admin/api/2024-10/products.json', {
      data: productData,
    })

    if (response.ok) {
      const body = await response.json()
      return Response.json(body, { status: 200 })
    } else {
      return Response.json(
        { error: 'Failed to create product' },
        { status: 500 },
      )
    }
  } catch (error) {
    return Response.json(
      { error: 'Failed to create custom product' },
      { status: 500 },
    )
  }
}
