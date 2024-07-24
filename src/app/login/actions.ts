'use server'

// import { cookies } from 'next/headers'
import { ServerActionError } from '@/@types/common'
import { LoginForm, LoginFormSchema } from '@/@types/customer'
// import { SHOPIFY_CART_ID_COOKIE } from '@/utils/constants/cookies'
import Customers from '@/database/dtos/customers'
import { isZodError } from '@/utils/functions/common'
import { doesPasswordMatch } from '@/utils/functions/password'

export async function login(_: ServerActionError<LoginForm>, form: FormData) {
  const data = {
    email: form.get('email')?.toString() || '',
    password: form.get('password')?.toString() || '',
    origin: form.get('origin')?.toString() || '',
  }

  try {
    LoginFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  console.log('FORM DATA : ', data)

  // get customer by email and validate password
  const { data: dbCustomers, error } = await Customers.findByEmail(data.email)
  if (error || !dbCustomers) {
    return {
      zodError: null,
      error: {
        title: 'Failed to find db customers',
        message: error,
      },
    }
  }
  if (
    dbCustomers.length === 0 ||
    !doesPasswordMatch(data.password, dbCustomers[0].passwordHash)
  ) {
    return {
      zodError: {
        _errors: [],
        email: {
          _errors: ['Invalid email or password'],
        },
        password: {
          _errors: ['Invalid email or password'],
        },
      },
    }
  }

  // TODO:
  // Query db for customer
  // Call Shopify API to create access token
  // Update customer in db (token, expiry, cartId if exists in cookie and null in query)
  // Set auth cookie
  // Set cart cookie if cookie is null and query is not null
  // If cart cookie is not null and query is null, update cart buyer email

  // Redirect to checkout link
  // Redirect to home page

  return { zodError: null }
}
