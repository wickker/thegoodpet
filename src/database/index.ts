'use server'

import { neon } from '@neondatabase/serverless'

import Config from '@/configs'

export const sql = neon(Config.DB_URL)
