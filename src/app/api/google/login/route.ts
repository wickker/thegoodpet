import { redirect } from 'next/navigation'
import { validateGooglePayload } from '@/app/api/google/utils'
import { Route } from '@/utils/constants/routes'

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
