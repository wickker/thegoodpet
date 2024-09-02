import { redirect } from 'next/navigation'
import { Route } from '@/utils/constants/routes'
import { validateGooglePayload } from '@/utils/functions/google'

// Handles login with Google
export async function POST(request: Request) {
  const data = await validateGooglePayload(request)
  if (!data.success) {
    redirect(`${Route.LOGIN}?error=${generateErrStr(data.error)}`)
  }

  // TODO: Add logic to handle data.payload
}

const generateErrStr = (message: string) =>
  JSON.stringify({ title: 'Login failed', message })
