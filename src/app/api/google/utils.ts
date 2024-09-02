import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { cookies } from 'next/headers'
import { GoogleReq, GoogleReqSchema } from '@/@types/google'
import Config from '@/configs'
import { isZodError } from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

export const validateGooglePayload = async (
  request: Request,
): Promise<
  { error: string; success: false } | { payload?: TokenPayload; success: true }
> => {
  const gCsrfCookie = cookies().get('g_csrf_token')
  if (!gCsrfCookie) {
    logger.error('Unable to find csrf token in cookie.')
    return { error: 'No csrf token in cookie.', success: false }
  }

  const req = Object.fromEntries(await request.formData()) as GoogleReq
  try {
    GoogleReqSchema.parse(req)
  } catch (err) {
    if (isZodError(err)) {
      logger.error(`Unable to parse google req: ${JSON.stringify(err)}.`)
      return { error: 'Failed to parse google request schema.', success: false }
    }
  }

  if (gCsrfCookie.value !== req.g_csrf_token) {
    logger.error(
      `Unable to match csrf token [cookie: ${gCsrfCookie.value}][payload: ${req.g_csrf_token}].`,
    )
    return { error: 'Csrf token mismatch.', success: false }
  }

  const authClient = new OAuth2Client()
  const data = await authClient.verifyIdToken({
    idToken: req.credential,
    audience: Config.GOOGLE_CLIENT_ID,
  })

  return { payload: data.getPayload(), success: true }
}
