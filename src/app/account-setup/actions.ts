'use server'

import { ServerActionError } from '@/@types/common'
import { SignUpForm, SignUpFormSchema } from '@/@types/customer'
import { isZodError } from '@/utils/functions/common'

export async function signUp(_: ServerActionError<SignUpForm>, form: FormData) {
  const data = {
    email: form.get('email'),
    password: form.get('password'),
    firstName: form.get('firstName'),
    lastName: form.get('lastName'),
    verifyPassword: form.get('verifyPassword'),
    countryCode: form.get('countryCode'),
    mobileNumber: form.get('mobileNumber'),
  }

  try {
    SignUpFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { error: err.format() }
  }

  return { error: null }
}
