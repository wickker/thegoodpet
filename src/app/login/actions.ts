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

  return { error: null }
}
