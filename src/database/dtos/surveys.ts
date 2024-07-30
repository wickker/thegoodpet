import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
import { SurveyData } from '@/@types/survey'
import { sql } from '@/database'
import { Gender, Ingredient, Species } from '@/utils/constants/db'

// TODO: Add logging
// TODO: Add typing

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
  shopify_product_id: string | null
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

const create = async (
  surveyData: SurveyData,
): Promise<{ data: Survey; error: null } | { data: null; error: string }> => {
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

const findAllSurveysWithNoPet = async (shopifyProductIds: Array<string>) => {
  try {
    const data = await sql(
      format(
        `SELECT id, name 
        FROM surveys 
        WHERE shopify_product_id IN (%L)
        AND pet_id is NULL
        AND deleted_at is NULL;
        `,
        shopifyProductIds,
      ),
    )
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updateShopifyProductId = async (
  surveyId: number,
  shopifyProductId: string,
): Promise<{ data: Survey; error: null } | { data: null; error: string }> => {
  try {
    const data = await sql(
      format(
        `UPDATE surveys
        SET shopify_product_id = %L
        WHERE id = %L
        RETURNING *;
        `,
        shopifyProductId,
        surveyId,
      ),
    )
    return { data: data[0] as Survey, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const updateSurveyWithPetId = async (petId: number, surveyId: number) => {
  try {
    const data = await sql`
    UPDATE surveys
    SET pet_id = ${petId}
    WHERE id = ${surveyId};
    `
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Surveys = {
  create,
  findAllSurveysWithNoPet,
  updateShopifyProductId,
  updateSurveyWithPetId,
}

export default Surveys
