import { z } from 'zod'

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be a minimum of 8 characters' })
    .max(191, {
      message: 'Password must be a maximum of 191 characters',
    }),
})

export const SignUpFormSchema = z
  .object({
    verifyPassword: z
      .string()
      .min(8, { message: 'Password must be a minimum of 8 characters' })
      .max(191, {
        message: 'Password must be a maximum of 191 characters',
      }),
    mobileNumber: z.string().refine(
      (v) => {
        if (v.length > 0) {
          return !Number.isNaN(v)
        }
        return true
      },
      {
        message: 'Invalid characters in mobile number',
      },
    ),
    countryCode: z
      .string()
      .min(2, { message: 'Country code must be a minimum of 2 characters' })
      .max(5, { message: 'Country code must be a maximum of 5 characters' })
      .refine((v) => v[0] === '+', {
        message: `Country code must begin with a '+'`,
      }),
    acceptsMarketing: z.boolean({ message: 'Field is required' }),
  })
  .merge(LoginFormSchema)
  .refine((values) => values.password === values.verifyPassword, {
    message: 'Password does not match',
    path: ['verifyPassword'],
  })

export type LoginForm = z.infer<typeof LoginFormSchema>
export type SignUpForm = z.infer<typeof SignUpFormSchema>
