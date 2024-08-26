import { ListOfSurveyIdAndProductVariantId } from '@/database/dtos/surveys'

export const getProductVariantIdToEncodedPathMap = (
  surveys: ListOfSurveyIdAndProductVariantId,
) => {
  const map: { [key: string]: string } = {}
  for (const s of surveys) {
    if (!s.shopify_product_variant_id) continue
    map[s.shopify_product_variant_id] = btoa(s.id.toString())
  }
  return map
}
