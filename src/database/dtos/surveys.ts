import { NeonDbError } from '@neondatabase/serverless'
import { sql } from '@/database'

// TODO: Add logging
// TODO: Add typing

const findAllSurveysWithNoPet = async (shopifyProductIds: Array<string>) => {
  try {
    const data = await sql(
      `SELECT id, name 
        FROM surveys 
        WHERE shopify_product_id = ANY($1::string[])
        AND pet_id is NULL
        AND deleted_at is NULL
        `,
      shopifyProductIds,
    )
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Surveys = {
  findAllSurveysWithNoPet,
}

export default Surveys
