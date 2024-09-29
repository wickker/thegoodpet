import { z } from 'zod'

const EmailSchema = z.string().trim().email()
const PasswordSchema = z
  .string()
  .trim()
  .min(8, { message: 'Password must be a minimum of 8 characters' })
  .max(191, {
    message: 'Password must be a maximum of 191 characters',
  })

export const ForgotPasswordFormSchema = z.object({
  email: EmailSchema,
})

export const BindAccountFormSchema = z.object({
  password: PasswordSchema
})

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export const ResetPasswordFormSchema = z
  .object({
    password: PasswordSchema,
    verifyPassword: PasswordSchema,
  })
  .refine((values) => values.password === values.verifyPassword, {
    message: 'Password does not match',
    path: ['verifyPassword'],
  })

export const SignUpFormSchema = z
  .object({
    verifyPassword: PasswordSchema,
    mobileNumber: z
      .string()
      .trim()
      .refine(
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
      .trim()
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

export type BindAccountForm = z.infer<typeof BindAccountFormSchema>  
export type ForgotPasswordForm = z.infer<typeof ForgotPasswordFormSchema>
export type LoginForm = z.infer<typeof LoginFormSchema>
export type ResetPasswordForm = z.infer<typeof ResetPasswordFormSchema>
export type SignUpForm = z.infer<typeof SignUpFormSchema>
