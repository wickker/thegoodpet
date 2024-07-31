import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import Pets from '@/database/dtos/pets'
import Surveys from '@/database/dtos/surveys'
import storefrontApi from '@/service/api/storefrontApi'
import { logger } from '@/utils/functions/logger'

export async function createPetsFromCart(customerId: number, cartId: string) {
  const cartRes = await storefrontApi.getCart(cartId)
  if (cartRes.errors) {
    logger.error(
      `Unable to get shopify cart [cartId: ${cartId}]: ${JSON.stringify(cartRes.errors)}.`,
    )
    return cartRes.errors?.message
  }

  if (!cartRes.data?.cart) {
    logger.warn(`Shopify cart is no longer valid [cartId: ${cartId}].`)
    return ''
  }

  const productIds = (cartRes.data.cart as Cart).lines.edges.map(
    (v) => v.node.merchandise.product.id,
  )
  const { data: surveys, error: selectErr } =
    await Surveys.findAllSurveysWithNoPet(productIds)
  if (selectErr || !surveys) {
    logger.error(
      `Unable to get all surverys with no pet linked [productIds: ${JSON.stringify(productIds)}]: ${selectErr}.`,
    )
    return selectErr
  }

  const insertArgs = surveys.map((s) => [
    s.name as string,
    customerId as number,
  ])
  const { data: petIds, error: bulkInsertErr } =
    await Pets.bulkCreate(insertArgs)
  if (bulkInsertErr || !petIds) {
    return bulkInsertErr
  }

  for (let i = 0; i < petIds.length; i++) {
    const petId = petIds[i].id
    const surveyId = surveys[i].id
    const { error } = await Surveys.updateSurveyWithPetId(petId, surveyId)
    if (error) {
      return error
    }
  }
}
