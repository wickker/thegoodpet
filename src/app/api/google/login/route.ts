import { OAuth2Client } from 'google-auth-library'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { GoogleReq, GoogleReqSchema } from '@/@types/google'
import Config from '@/configs'
import { Route } from '@/utils/constants/routes'
import { isZodError } from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

// Handles login with Google
export async function POST(request: Request) {
  const gCsrfCookie = cookies().get('g_csrf_token')
  if (!gCsrfCookie) {
    logger.error('Unable to find csrf token in cookie.')
    redirect(
      `${Route.LOGIN}?error=${generateErrStr('No csrf token in cookie.')}`,
    )
  }

  const req = Object.fromEntries(await request.formData()) as GoogleReq
  try {
    GoogleReqSchema.parse(req)
  } catch (err) {
    if (isZodError(err)) {
      logger.error(`Unable to parse google req: ${JSON.stringify(err)}.`)
      redirect(
        `${Route.LOGIN}?error=${generateErrStr('Failed to parse request schema.')}`,
      )
    }
  }

  if (gCsrfCookie.value !== req.g_csrf_token) {
    logger.error(
      `Unable to match csrf token [cookie: ${gCsrfCookie.value}][payload: ${req.g_csrf_token}].`,
    )
    redirect(`${Route.LOGIN}?error=${generateErrStr('Csrf token mismatch.')}`)
  }

  const authClient = new OAuth2Client()
  const data = await authClient.verifyIdToken({
    idToken: req.credential,
    audience: Config.GOOGLE_CLIENT_ID,
  })
  const payload = data.getPayload()
  console.log(payload)
}

const generateErrStr = (message: string) =>
  JSON.stringify({ title: 'Login failed', message })
