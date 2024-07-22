import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type LoginForm = z.infer<typeof LoginFormSchema>
