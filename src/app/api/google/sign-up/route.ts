import { redirect } from 'next/navigation'
import { validateGooglePayload } from '@/app/api/google/utils'
import Customers from '@/database/dtos/customers'
import { Route } from '@/utils/constants/routes'
import { logger } from '@/utils/functions/logger'

// Handles sign up with Google
export async function POST(request: Request) {
  const data = await validateGooglePayload(request)
  if (!data.success) {
    redirect(`${Route.LOGIN}?error=${generateErrStr(data.error)}`)
  }
  if (!data.payload) {
    redirect(
      `${Route.LOGIN}?error=${generateErrStr('Google payload is undefined.')}`,
    )
  }
  const payload = data.payload

  // check if google sub exists
  const { data: subCustomers, error: selectErr } =
    await Customers.findByGoogleSub(payload.sub)
  if (selectErr || !subCustomers) {
    logger.error(
      `Unable to find customers by google sub [googleSub: ${payload.sub}]: ${selectErr}.`,
    )
    redirect(`${Route.LOGIN}?error=${generateErrStr(selectErr)}`)
  }
  if (subCustomers.length > 0) {
    logger.error(
      `Customer with sub already exists [googleSub: ${payload.sub}].`,
    )
    redirect(
      `${Route.LOGIN}?error=${generateErrStr('Google customer already exists, please login instead.')}`,
    )
  }

  //
}

const generateErrStr = (message: string) =>
  JSON.stringify({ title: 'Sign up failed', message })
