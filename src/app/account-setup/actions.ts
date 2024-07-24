'use server'

import { CustomerCreatePayload } from '@shopify/hydrogen-react/storefront-api-types'
import { cookies } from 'next/headers'
import { ServerActionError } from '@/@types/common'
import { SignUpForm, SignUpFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
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
  const phone = `${data.countryCode}${data.mobileNumber}`

  //   const rows = await Customers.findByEmailOrPhone(data.email, phone)
  //   if (rows.length > 0) {
  //     return {
  //       zodError: {
  //         _errors: [],
  //         email: {
  //           _errors: ['Phone or email is already taken'],
  //         },
  //         mobileNumber: {
  //           _errors: ['Phone or email is already taken'],
  //         },
  //       },
  //     }
  //   }

  //   const [{ id: customerId }] = await Customers.create(
  //     data.email,
  //     data.firstName,
  //     data.lastName,
  //     passwordHash,
  //     phone,
  //     cartId,
  //   )

  const res = await storefrontApi.createCustomer({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone,
    password: data.password, // original password
    acceptsMarketing: true,
  })
  if (res.errors) {
    return {
      zodError: null,
      error: {
        title: 'Unable to create Shopify customer',
        message: JSON.stringify(res.errors),
      },
    }
  }
  const shopifyCustomer = res.data.customerCreate as CustomerCreatePayload
  if (shopifyCustomer.customerUserErrors) {
    return {
      zodError: null,
      error: {
        title: 'Unable to create Shopify customer',
        message: JSON.stringify(shopifyCustomer.customerUserErrors),
      },
    }
  }

  


  return { zodError: null }
}
