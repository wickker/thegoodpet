'use server'

import { CustomerRecoverPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { ServerActionError } from '@/@types/common'
import { ForgotPasswordForm, ForgotPasswordFormSchema } from '@/@types/customer'
import storefrontApi from '@/service/api/storefrontApi'
import {
  StorefrontDataKey,
  StorefrontErrorKey,
} from '@/utils/constants/storefrontGql'
import {
  handleStorefrontGqlResponse,
  isZodError,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'

type ResetPasswordRes = ServerActionError<ForgotPasswordForm> & {
  isSuccess?: boolean
}

export async function sendResetPasswordEmail(
  _: undefined | ResetPasswordRes,
  form: FormData,
): Promise<ResetPasswordRes> {
  const data = {
    email: form.get('email')?.toString() || '',
  }

  try {
    ForgotPasswordFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  const res = await storefrontApi.sendCustomerResetPasswordEmail(data.email)
  const { data: sendEmailRes, error } =
    handleStorefrontGqlResponse<CustomerRecoverPayload>(
      res,
      StorefrontDataKey.CUSTOMER_RECOVER,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (error || !sendEmailRes) {
    logger.error(
      `Unable to send customer reset password email [email: ${data.email}]: ${error}.`,
    )
    return {
      error: {
        title: 'Failed to send reset password email',
        message: error || '',
      },
    }
  }

  return { isSuccess: true }
}
