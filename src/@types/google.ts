import { z } from 'zod'

export const GoogleRequestSchema = z.object({
  credential: z.string(),
  g_csrf_token: z.string(),
})

export type GoogleRequest = z.infer<typeof GoogleRequestSchema>
