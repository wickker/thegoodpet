'use server'

import { CartLinesAddPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { ServerActionError } from '@/@types/common'
import Customers from '@/database/dtos/customers'
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
  sellingPlanId: z.string().optional(),
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
    sellingPlanId: form.get('sellingPlanId') || undefined,
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
    const addItemToCartRequestBody = {
      cartId: cartIdCookie.value,
      lines: [parsedData.data],
    }

    const addItemToCartResponse = await storefrontApi.addItemToCart(
      addItemToCartRequestBody,
    )

    const { error: addItemToCartError } =
      handleStorefrontGqlResponse<CartLinesAddPayload>(
        addItemToCartResponse,
        StorefrontDataKey.CART_LINES_ADD,
      )

    if (!addItemToCartError) {
      return { success: true }
    }

    logger.warn(
      `Unable to add items to cart [addItemToCartRequestBody: ${JSON.stringify(addItemToCartRequestBody)}]: ${addItemToCartError}.`,
    )
  }

  // Create new cart with item
  const emailCookie = cookieStore.get(SHOPIFY_CUSTOMER_EMAIL_COOKIE)
  const createCartRequestBody = {
    buyerIdentity: {
      email: emailCookie ? emailCookie.value : undefined,
    },
    lines: [parsedData.data],
  }

  const createCartResponse = await storefrontApi.createCart(
    createCartRequestBody,
  )

  const { data: createCartData, error: createCartError } =
    handleStorefrontGqlResponse<CartLinesAddPayload>(
      createCartResponse,
      StorefrontDataKey.CART_CREATE,
    )

  if (createCartError) {
    logger.error(
      `Unable to create cart [createCartRequestBody: ${createCartRequestBody}]: ${createCartError}.`,
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

    if (emailCookie) {
      const { error } = await Customers.updateCartId(
        emailCookie.value,
        createCartData.cart.id,
      )
      if (error) {
        logger.error(
          `Unable to update customer cartId [email: ${emailCookie.value}][cartId: ${createCartData.cart.id}]: ${error}.`,
        )
        return {
          error: {
            title: 'Failed to update customer cartId',
            message: 'Please try again',
          },
        }
      }
    }
  }

  return {
    success: true,
  }
}
