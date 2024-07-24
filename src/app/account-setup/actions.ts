'use server'

import { cookies } from 'next/headers'
import { ServerActionError } from '@/@types/common'
import { SignUpForm, SignUpFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import { isZodError } from '@/utils/functions/common'
import { getPasswordHash } from '@/utils/functions/password'

export async function signUp(_: ServerActionError<SignUpForm>, form: FormData) {
  const data = {
    email: form.get('email')?.toString() || '',
    password: form.get('password')?.toString() || '',
    firstName: form.get('firstName')?.toString() || '',
    lastName: form.get('lastName')?.toString() || '',
    verifyPassword: form.get('verifyPassword')?.toString() || '',
    countryCode: form.get('countryCode')?.toString() || '',
    mobileNumber: form.get('mobileNumber')?.toString() || '',
    origin: form.get('origin')?.toString() || '',
  }

  try {
    SignUpFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  const cookieStore = cookies()
  const cartIdCookie = cookieStore.get(SHOPIFY_CART_ID_COOKIE)
  let cartId = ''
  if (cartIdCookie) {
    cartId = cartIdCookie.value
  }
  const passwordHash = getPasswordHash(data.password)

  const res = await Customers.findByEmail(data.email)
  console.log(res)

  const [{ id: customerId }] = await Customers.create(
    data.email,
    data.firstName,
    data.lastName,
    passwordHash,
    `${data.countryCode}${data.mobileNumber}`,
    cartId,
  )

  console.log(customerId)

  return { zodError: null }
}
