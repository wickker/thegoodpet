import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
import { SurveyData } from '@/@types/survey'
import { sql } from '@/database'

// TODO: Add logging
// TODO: Add typing

const create = async (surveyData: SurveyData) => {
  try {
    const query = format(
      `INSERT INTO surveys ( species, gender, name, age_year, age_month, is_neutered, breed, weight_gram, weight_goal, activity_level, food_goal, allergic_ingredients, omit_ingredients, meal_doneness, meal_type_to_quantity )
        VALUES ( %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L );`,
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

    return { data, error: null }
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

const Surveys = {
  create,
  findAllSurveysWithNoPet,
}

export default Surveys
