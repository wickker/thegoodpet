import Surveys from '@/database/dtos/surveys'
import shopifyAdminApi from '@/service/api/shopifyAdminApi'
import { logger } from '@/utils/functions/logger'

type GetOptions = { params: { id: string } }

export async function GET(_: Request, options: GetOptions) {
  const surveyIdStr = options.params.id
  const surveyId = parseInt(surveyIdStr)

  if (surveyId < 1 || isNaN(surveyId)) {
    logger.error('Invalid id provided.')
    return Response.json(
      {
        title: 'Failed to get custom meal',
        message: 'Invalid custom meal id',
      },
      { status: 400 },
    )
  }

  const { data: survey, error: SelectSurveyErr } =
    await Surveys.findById(surveyId)
  if (SelectSurveyErr || !survey) {
    logger.error(
      `Unable to get survey [surveyId: ${surveyId}]: ${SelectSurveyErr}.`,
    )
    return Response.json(
      {
        title: 'Failed to get custom meal',
        message: 'Invalid custom meal id',
      },
      { status: 500 },
    )
  }

  const shopifyProductVariantId = survey.shopify_product_variant_id
  if (!shopifyProductVariantId) {
    logger.error(
      `Unable to get shopify product variant id [shopifyProductVariantId: ${shopifyProductVariantId}].`,
    )
    return Response.json(
      {
        title: 'Failed to get custom meal',
        message: 'Missing shopify product id',
      },
      { status: 500 },
    )
  }

  const { data: product, errors: getProductVariantErr } =
    await shopifyAdminApi.getProductVariant(shopifyProductVariantId)
  if (getProductVariantErr) {
    logger.error(
      `Unable to get shopify product [shopifyProductVariantId: ${shopifyProductVariantId}]: ${JSON.stringify(getProductVariantErr)}.`,
    )
    return Response.json(
      {
        title: 'Failed to get custom meal',
        message: 'Unable to fetch data from shopify',
      },
      { status: 500 },
    )
  }

  return Response.json({ survey, product })
}
