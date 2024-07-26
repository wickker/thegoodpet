import { NeonDbError } from '@neondatabase/serverless'
import format from 'pg-format'
import { sql } from '@/database'

// TODO: Add logging
// TODO: Add typing

const bulkCreate = async (input: Array<[string, number]>) => {
  try {
    const data = await sql(
      format('INSERT INTO pets (name, customer_id) VALUES %L;', input),
    )
    return { data, error: null }
  } catch (err) {
    return { data: null, error: (err as NeonDbError).message }
  }
}

const Pets = {
  bulkCreate,
}

export default Pets
