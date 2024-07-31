import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
import { ListOfSurveyIdAndName } from './surveys'
import { DbResponse, sql } from '@/database'

type Pet = {
  id: number
  name: string
  customer_id: number
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

const bulkCreateAndUpdateSurveys = async (
  surveys: ListOfSurveyIdAndName,
  customerId: number,
): Promise<DbResponse> => {
  try {
    const insertArgs = surveys.map((s) => [
      s.name as string,
      customerId as number,
    ])
    await sql`BEGIN;`
    const pets = (await sql(
      format(
        'INSERT INTO pets (name, customer_id) VALUES %L RETURNING id;',
        insertArgs,
      ),
    )) as Array<Pick<Pet, 'id'>>

    for (let i = 0; i < pets.length; i++) {
      const petId = pets[i].id
      const surveyId = surveys[i].id
      await sql`
      UPDATE surveys
      SET pet_id = ${petId}
      WHERE id = ${surveyId};
      `
    }
    await sql`COMMIT;`
    return { data: [], error: null }
  } catch (err) {
    await sql`ROLLBACK;`
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Pets = {
  bulkCreateAndUpdateSurveys,
}

export default Pets
