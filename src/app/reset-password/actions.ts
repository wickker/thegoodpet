'use server'

import { CustomerResetByUrlPayload } from '@shopify/hydrogen-react/storefront-api-types'
import { redirect } from 'next/navigation'
import { ServerActionError } from '@/@types/common'
import { ResetPasswordForm, ResetPasswordFormSchema } from '@/@types/customer'
import Customers from '@/database/dtos/customers'
import storefrontApi from '@/service/api/storefrontApi'
import { Route } from '@/utils/constants/routes'
import {
  StorefrontDataKey,
  StorefrontErrorKey,
} from '@/utils/constants/storefrontGql'
import {
  handleStorefrontGqlResponse,
  isZodError,
} from '@/utils/functions/common'
import { logger } from '@/utils/functions/logger'
import { getPasswordHash } from '@/utils/functions/password'

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

  // reset password
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

  // update db
  const passwordHash = getPasswordHash(data.password)
  const { error: updateErr } = await Customers.updatePasswordHash(
    passwordHash,
    resetRes.customer?.email || '',
  )
  if (updateErr) {
    logger.error(
      `Unable to update password hash [email: ${resetRes.customer?.email}][passwordHash: ${passwordHash}]: ${updateErr}.`,
    )
    return {
      error: {
        title: 'Failed to update password hash',
        message: updateErr || '',
      },
    }
  }

  redirect(Route.LOGIN)
}
