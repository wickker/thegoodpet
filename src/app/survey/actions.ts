'use server'

// import { redirect } from 'next/navigation'
import { ServerActionError } from '@/@types/common'
import { MeatTypeToQuantity, SurveyData } from '@/@types/survey'
import Surveys from '@/database/dtos/surveys'
import shopifyAdminApi from '@/service/api/shopifyAdminApi'
import { Ingredient } from '@/utils/constants/db'
import { capitalize } from '@/utils/functions/common'

export async function createSurveyAndCustomProduct(
  surveyData: SurveyData,
): Promise<ServerActionError<undefined> | undefined> {
  const { data: survey, error: createSurveyErr } =
    await Surveys.create(surveyData)

  if (createSurveyErr !== null) {
    return {
      zodError: null,
      error: {
        title: 'Failed to submit survey',
        message: createSurveyErr,
      },
    }
  }

  const customProductTitle = `${capitalize(surveyData.name)}'s Tailor-made meals`
  const customProductDescription = generateProductDescription(
    surveyData.mealTypeToQuantity,
    200,
  )
  const customProductPrice = 50

  const { data: shopifyProduct, errors: createProductErr } =
    await shopifyAdminApi.createProduct(
      customProductTitle,
      customProductDescription,
    )
  const shopifyProductId = shopifyProduct?.productCreate.product.id

  if (createProductErr || !shopifyProductId) {
    return {
      zodError: null,
      error: {
        title: 'Failed to create custom product',
        message: createProductErr?.message || '',
      },
    }
  }

  // create variant
  const { data: shopifyProductVariant, errors: createProductVariantErr } =
    await shopifyAdminApi.createProductVariant(
      shopifyProductId,
      customProductPrice,
    )

  const shopifyProductVariantId =
    shopifyProductVariant?.productVariantsBulkCreate?.productVariants[0]?.id
  console.log(JSON.stringify(createProductVariantErr?.graphQLErrors))
  if (createProductVariantErr || !shopifyProductVariantId) {
    return {
      zodError: null,
      error: {
        title: 'Failed to create custom product variant',
        message: createProductVariantErr?.message || '',
      },
    }
  }

  // update survey
  const { error: updateSurveyErr } = await Surveys.updateShopifyProductId(
    survey.id,
    shopifyProductVariantId,
  )

  if (updateSurveyErr) {
    return {
      zodError: null,
      error: {
        title: 'Failed to update survey product',
        message: updateSurveyErr,
      },
    }
  }

  // redirect to custom-meals
  // redirect('/custom-meals')
}

function generateProductDescription(
  meatTypeToQuantity: MeatTypeToQuantity,
  foodVolumeGrams: number,
) {
  let description =
    '<strong>Tailor-made meals with the following meats:</strong>'

  for (const ingredient in meatTypeToQuantity) {
    const qty = meatTypeToQuantity[ingredient as Ingredient]
    description += `<br />${foodVolumeGrams} grams of ${capitalize(ingredient)}, ${qty} packs`
  }

  return description
}
