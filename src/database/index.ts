'use server'

import { neon } from '@neondatabase/serverless'

import Config from '@/configs'

console.log(Config.DB_URL)
export const sql = neon(Config.DB_URL)
