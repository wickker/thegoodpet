'use server'

import { redirect } from 'next/navigation'
import { ServerActionError } from '@/@types/common'
import { MeatTypeToQuantity, SurveyData } from '@/@types/survey'
import Surveys from '@/database/dtos/surveys'
import shopifyAdminApi from '@/service/api/shopifyAdminApi'
import { Ingredient } from '@/utils/constants/db'
import { Route } from '@/utils/constants/routes'
import { capitalize } from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

export async function createSurveyAndCustomProduct(
  surveyData: SurveyData,
): Promise<ServerActionError<undefined> | undefined> {
  const { data: survey, error: createSurveyErr } =
    await Surveys.create(surveyData)

  if (createSurveyErr !== null) {
    logger.error(
      `Unable to create new survey [survey: ${JSON.stringify(surveyData)}]: ${createSurveyErr}.`,
    )
    return {
      error: {
        title: 'Failed to submit survey',
        message: createSurveyErr,
      },
    }
  }

  const petName = surveyData.name
  const customDescription = generateProductDescription(
    surveyData.mealTypeToQuantity,
    200,
  ) // TODO: get volume from calc
  const customPrice = 0.1 // TODO: get price from calc

  const { data: shopifyProductVariant, errors: createProductVariantErr } =
    await shopifyAdminApi.createProductVariant(
      petName,
      customDescription,
      customPrice,
    )
  const shopifyProductVariantId =
    shopifyProductVariant?.productVariantCreate?.productVariant?.id
  if (createProductVariantErr || !shopifyProductVariantId) {
    logger.error(
      `Unable to create new shopify product variant [petName: ${petName}][description: ${customDescription}][price: ${customPrice}]: ${createProductVariantErr}.`,
    )
    return {
      error: {
        title: 'Failed to create custom product variant',
        message: createProductVariantErr?.message || '',
      },
    }
  }

  const { data: updatedSurvey, error: updateSurveyErr } =
    await Surveys.updateShopifyProductId(survey.id, shopifyProductVariantId)

  if (updateSurveyErr || !updatedSurvey) {
    logger.error(
      `Unable to update survey shopify product id [surveyId: ${survey.id}][shopifyProductVariantId: ${shopifyProductVariantId}]: ${updateSurveyErr}.`,
    )
    return {
      error: {
        title: 'Failed to update survey product',
        message: updateSurveyErr,
      },
    }
  }

  redirect(`${Route.CUSTOM_MEALS}/${updatedSurvey.id}`)
}

function generateProductDescription(
  meatTypeToQuantity: MeatTypeToQuantity,
  foodVolumeGrams: number,
) {
  return Object.keys(meatTypeToQuantity)
    .map((ingredient) => {
      const qty = meatTypeToQuantity[ingredient as Ingredient]
      return `${foodVolumeGrams} grams of ${capitalize(ingredient)}, ${qty} packs`
    })
    .join('|')
}
