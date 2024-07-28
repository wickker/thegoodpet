import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
import { sql } from '@/database'

// TODO: Add logging
// TODO: Add typing

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
  findAllSurveysWithNoPet,
  updateSurveyWithPetId,
}

export default Surveys
