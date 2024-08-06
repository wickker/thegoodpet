'use server'

import { ServerActionError } from '@/@types/common'
import { SurveyData } from '@/@types/survey'
import Surveys from '@/database/dtos/surveys'
import shopifyAdminApi from '@/service/api/shopifyAdminApi'
import { logger } from '@/utils/functions/logger'
import { generateMealProduct, getMealMetrics } from '@/utils/functions/meal'

export async function createSurveyAndCustomProduct(
  surveyData: SurveyData,
): Promise<(ServerActionError<undefined> & { surveyId?: number }) | undefined> {
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
  const { DER } = getMealMetrics(
    surveyData.weight,
    surveyData.species,
    surveyData.ageMonth + surveyData.ageYear * 12,
    surveyData.isNeutered,
    surveyData.weightGoal,
    surveyData.activityLevel,
  )
  const { description: customDescription, price: customPrice } =
    generateMealProduct(surveyData.species, DER, surveyData.mealTypeToQuantity)

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

  return {
    surveyId: updatedSurvey.id,
  }
}
