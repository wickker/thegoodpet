import { sql } from '@/database'

export const getAllPets = async () => await sql`SELECT * from pets`
