import { NeonDbError } from '@neondatabase/serverless'
import { format } from 'node-pg-format'
import { SurveyData } from '@/@types/survey'
import { DbResponse, sql } from '@/database'
import { Gender, Ingredient, Species } from '@/utils/constants/db'

type Survey = {
  id: number
  species: Species
  gender: Gender
  name: string
  age_year: number
  age_month: number
  is_neutered: boolean
  breed: string
  weight_gram: number
  weight_goal: number
  activity_level: number
  food_goal: string
  allergic_ingredients: Array<Ingredient> | null
  omit_ingredients: Array<Ingredient> | null
  meal_doneness: string
  meal_type_to_quantity: Record<Ingredient, number>
  pet_id: number | null
  shopify_product_variant_id: string | null
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export type ListOfSurveyIdAndName = Array<Pick<Survey, 'id' | 'name'>>

export type ListOfSurveyIdAndProductVariantId = Array<
  Pick<Survey, 'id' | 'shopify_product_variant_id'>
>

const create = async (surveyData: SurveyData): Promise<DbResponse<Survey>> => {
  try {
    const query = format(
      `INSERT INTO surveys ( species, gender, name, age_year, age_month, is_neutered, breed, weight_gram, weight_goal, activity_level, food_goal, allergic_ingredients, omit_ingredients, meal_doneness, meal_type_to_quantity )
        VALUES ( %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L )
        RETURNING *;`,
      surveyData.species,
      surveyData.gender,
      surveyData.name,
      surveyData.ageYear,
      surveyData.ageMonth,
      surveyData.isNeutered,
      surveyData.breed,
      surveyData.weight,
      surveyData.weightGoal,
      surveyData.activityLevel,
      surveyData.foodGoal,
      JSON.stringify(surveyData.allergicIngredients),
      JSON.stringify(surveyData.omitIngredients),
      surveyData.mealDoneness,
      JSON.stringify(surveyData.mealTypeToQuantity),
    )

    const data = await sql(query)

    return { data: data[0] as Survey, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findById = async (id: number): Promise<DbResponse<Survey>> => {
  try {
    const data = await sql(
      format(
        `SELECT *
        FROM surveys 
        WHERE id = (%L)`,
        id,
      ),
    )
    return { data: data[0] as Survey, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findAllSurveysWithNoPet = async (
  shopifyProductVariantIds: Array<string>,
): Promise<DbResponse<ListOfSurveyIdAndName>> => {
  try {
    const data = await sql(
      format(
        `SELECT id, name 
        FROM surveys 
        WHERE shopify_product_variant_id IN (%L)
        AND pet_id is NULL
        AND deleted_at is NULL;
        `,
        shopifyProductVariantIds,
      ),
    )
    return { data: data as ListOfSurveyIdAndName, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const findAllSurveysByProductVariantIds = async (
  shopifyProductVariantIds: Array<string>,
): Promise<DbResponse<ListOfSurveyIdAndProductVariantId>> => {
  try {
    const data = await sql(
      format(
        `SELECT id, shopify_product_variant_id
        FROM surveys 
        WHERE shopify_product_variant_id IN (%L)
        AND deleted_at is NULL;
        `,
        shopifyProductVariantIds,
      ),
    )
    return { data: data as ListOfSurveyIdAndProductVariantId, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updateShopifyProductVariantId = async (
  surveyId: number,
  shopifyProductVariantId: string,
): Promise<DbResponse<Survey>> => {
  try {
    const data = await sql(
      format(
        `UPDATE surveys
        SET shopify_product_variant_id = %L
        WHERE id = %L
        RETURNING *;
        `,
        shopifyProductVariantId,
        surveyId,
      ),
    )
    return { data: data[0] as Survey, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Surveys = {
  create,
  findById,
  findAllSurveysByProductVariantIds,
  findAllSurveysWithNoPet,
  updateShopifyProductVariantId,
}

export default Surveys
