'use server'

import { CartLinesAddPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { ServerActionError } from '@/@types/common'
import storefrontApi from '@/service/api/storefrontApi'
import {
  SHOPIFY_CART_ID_COOKIE,
  SHOPIFY_CUSTOMER_EMAIL_COOKIE,
} from '@/utils/constants/cookies'
import { StorefrontDataKey } from '@/utils/constants/storefrontGql'
import {
  handleStorefrontGqlResponse,
  setCookie,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

const AddToCartFormSchema = z.object({
  sellingPlanId: z.string({
    message: 'Please select a subscription option',
  }),
  merchandiseId: z.string({
    message: 'Product not found',
  }),
})

type AddToCartForm = z.infer<typeof AddToCartFormSchema>

export async function addToCart(
  _: undefined | ServerActionError<AddToCartForm>,
  form: FormData,
): Promise<
  undefined | (ServerActionError<AddToCartForm> & { success?: boolean })
> {
  const data = {
    sellingPlanId: form.get('sellingPlanId'),
    merchandiseId: form.get('merchandiseId'),
  }

  const parsedData = AddToCartFormSchema.safeParse(data)
  if (!parsedData.success) {
    return { zodError: parsedData.error.format() }
  }

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)

  // Add item to existing cart
  if (cartIdCookie) {
    const addItemToCartResponse = await storefrontApi.addItemToCart({
      cartId: cartIdCookie.value,
      lines: [parsedData.data],
    })

    const { error: addItemToCartError } =
      handleStorefrontGqlResponse<CartLinesAddPayload>(
        addItemToCartResponse,
        StorefrontDataKey.CART_LINES_ADD,
      )

    if (addItemToCartError) {
      logger.error(
        `Unable to add items to cart [cartId: ${cartIdCookie.value}][merchandiseId: ${parsedData.data.merchandiseId}][sellingPlanId: ${parsedData.data.sellingPlanId}]: ${addItemToCartError}.`,
      )
      return {
        error: {
          title: 'Failed to add item to cart',
          message: 'Please try again',
        },
      }
    }

    return {
      success: true,
    }
  }

  // Create new cart with item
  const emailCookie = cookieStore.get(SHOPIFY_CUSTOMER_EMAIL_COOKIE)

  const createCartResponse = await storefrontApi.createCart({
    buyerIdentity: {
      email: emailCookie ? emailCookie.value : undefined,
    },
    lines: [parsedData.data],
  })

  const { data: createCartData, error: createCartError } =
    handleStorefrontGqlResponse<CartLinesAddPayload>(
      createCartResponse,
      StorefrontDataKey.CART_CREATE,
    )

  if (createCartError) {
    logger.error(
      `Unable to create cart [email: ${emailCookie?.value}][merchandiseId: ${parsedData.data.merchandiseId}][sellingPlanId: ${parsedData.data.sellingPlanId}]: ${createCartError}.`,
    )
    return {
      error: {
        title: 'Failed to add item to cart',
        message: 'Please try again',
      },
    }
  }

  if (createCartData?.cart?.id) {
    setCookie(cookieStore, SHOPIFY_CART_ID_COOKIE, createCartData.cart.id)
  }

  return {
    success: true,
  }
}
