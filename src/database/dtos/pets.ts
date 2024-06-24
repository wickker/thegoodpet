'use server'

import { sql } from '@/database'

export const getData = async () => await sql`SELECT version()`
