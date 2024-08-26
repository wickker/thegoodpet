'use server'

import { CustomerResetByUrlPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { ServerActionError } from '@/@types/common'
import { ResetPasswordForm, ResetPasswordFormSchema } from '@/@types/customer'
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

export async function resetPassword(
  _: undefined | ServerActionError<ResetPasswordForm>,
  form: FormData,
): Promise<undefined | ServerActionError<ResetPasswordForm>> {
  const data = {
    password: form.get('password')?.toString() || '',
    verifyPassword: form.get('verifyPassword')?.toString() || '',
    resetPasswordUrl: form.get('resetPasswordUrl')?.toString() || '',
  }

  try {
    ResetPasswordFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  const res = await storefrontApi.resetCustomerPasswordByUrl(
    data.password,
    data.resetPasswordUrl,
  )
  const { data: resetRes, error } =
    handleStorefrontGqlResponse<CustomerResetByUrlPayload>(
      res,
      StorefrontDataKey.CUSTOMER_RESET_BY_URL,
      StorefrontErrorKey.CUSTOMER_USER_ERRORS,
    )
  if (error || !resetRes) {
    logger.error(
      `Unable to reset customer password [url: ${data.resetPasswordUrl}]: ${error}.`,
    )
    return {
      error: {
        title: 'Failed to reset password',
        message: error || '',
      },
    }
  }

  // TODO: Auto login flow
}
