import { z } from 'zod'

export const GoogleReqSchema = z.object({
  credential: z.string(),
  g_csrf_token: z.string(),
})

export type GoogleReq = z.infer<typeof GoogleReqSchema>
