import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'
import { validateGooglePayload } from '@/app/api/google/utils'
import Customers from '@/database/dtos/customers'
import { Route } from '@/utils/constants/routes'
import { logger } from '@/utils/functions/logger'

// Handles sign up with Google
export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const origin = searchParams.get('origin') || ''

  const data = await validateGooglePayload(request)
  if (!data.success) {
    redirect(`${Route.ACCOUNT_SETUP}?error=${generateErrStr(data.error)}`)
  }
  if (!data.payload) {
    redirect(
      `${Route.ACCOUNT_SETUP}?error=${generateErrStr('Google payload is undefined.')}`,
    )
  }
  const payload = data.payload

  // check if google sub exists
  const { data: subCustomers, error: subErr } = await Customers.findByGoogleSub(
    payload.sub,
  )
  if (subErr || !subCustomers) {
    logger.error(
      `Unable to find customers by google sub [googleSub: ${payload.sub}]: ${subErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?error=${generateErrStr(subErr)}`)
  }
  if (subCustomers.length > 0) {
    logger.error(
      `Customer with sub already exists [googleSub: ${payload.sub}].`,
    )
    redirect(
      `${Route.ACCOUNT_SETUP}?error=${generateErrStr('Google customer already exists, please login instead.')}`,
    )
  }

  // check if email already exists
  const { data: emailCustomers, error: emailErr } = await Customers.findByEmail(
    payload.email || '',
  )
  if (emailErr || !emailCustomers) {
    logger.error(
      `Unable to find customers by google email [email: ${payload.email}]: ${emailErr}.`,
    )
    redirect(`${Route.ACCOUNT_SETUP}?error=${generateErrStr(emailErr)}`)
  }
  if (emailCustomers.length > 0) {
    const originPath = origin ? `&origin=${origin}` : ''
    redirect(
      `${Route.BIND_ACCOUNT}?email=${payload.email}&google_sub=${payload.sub}${originPath}`,
    )
  }
}

const generateErrStr = (message: string) =>
  JSON.stringify({ title: 'Sign up failed', message })
