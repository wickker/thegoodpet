'use server'

import { ServerActionError } from '@/@types/common'
import { BindAccountForm, BindAccountFormSchema } from '@/@types/customer'
import { isZodError } from '@/utils/functions/common'

export async function bindAccountAndLogin(
  _: undefined | ServerActionError<BindAccountForm>,
  form: FormData,
): Promise<undefined | ServerActionError<BindAccountForm>> {
  const data = {
    password: form.get('password')?.toString() || '',
    // origin: form.get('origin')?.toString() || '',
  }

  try {
    BindAccountFormSchema.parse(data)
  } catch (err) {
    if (isZodError(err)) return { zodError: err.format() }
  }

  // TODO:
}
