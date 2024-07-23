'use server'

import { ServerActionError } from '@/@types/common'
import { LoginForm, LoginFormSchema } from '@/@types/customer'
import { isZodError } from '@/utils/functions/common'

export async function login(_: ServerActionError<LoginForm>, form: FormData) {
  const data = {
    email: form.get('email'),
    password: form.get('password'),
  }

  try {
    LoginFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { error: err.format() }
  }

  // TODO:
  // Query db for customer
  // Call Shopify API to create access token
  // Update customer in db
  // Set auth cookie
  // Redirect to home page

  return { error: null }
}
