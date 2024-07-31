import { neon } from '@neondatabase/serverless'
import Config from '@/configs'

export const sql = neon(Config.DB_URL)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DbResponse<T = Array<Record<string, any>>> =
  | {
      data: T
      error: null
    }
  | { data: null; error: string }
