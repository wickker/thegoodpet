import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be a minimum of 8 characters' }),
})

export type LoginForm = z.infer<typeof LoginFormSchema>
