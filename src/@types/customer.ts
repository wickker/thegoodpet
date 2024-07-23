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
    firstName: z
      .string()
      .min(1, { message: 'First name is required' })
      .max(191, {
        message: 'First name must be a maximum of 191 characters',
      }),
    lastName: z.string().min(1, { message: 'Last name is required' }).max(191, {
      message: 'Last name must be a maximum of 191 characters',
    }),
    verifyPassword: z
      .string()
      .min(8, { message: 'Password must be a minimum of 8 characters' })
      .max(191, {
        message: 'Password must be a maximum of 191 characters',
      }),
    mobileNumber: z
      .string()
      .length(8, { message: 'Mobile number must be a minimum of 8 numbers' })
      .refine((v) => !Number.isNaN(v), {
        message: 'Invalid characters in mobile number',
      }),
    countryCode: z
      .string()
      .min(2, { message: 'Country code must be a minimum of 2 characters' })
      .max(5, { message: 'Country code must be a maximum of 5 characters' })
      .refine((v) => v[0] === '+', {
        message: `Country code must begin with a '+'`,
      }),
  })
  .merge(LoginFormSchema)
  .refine((values) => values.password === values.verifyPassword, {
    message: 'Password does not match',
    path: ['verifyPassword'],
  })

export type LoginForm = z.infer<typeof LoginFormSchema>
export type SignUpForm = z.infer<typeof SignUpFormSchema>
