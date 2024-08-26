'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { resetPassword } from '@/app/reset-password/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function ResetPasswordForm() {
  const [state, formAction] = useFormState(resetPassword, undefined)
  const searchParams = useSearchParams()
  const resetPasswordUrl = searchParams.get('url') || ''
  const { notification } = useContext(NotificationsContext)

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }
  }, [state?.error])

  return (
    <form action={formAction}>
      <p className="mb-2.5 text-neutral-900">Password</p>
      <input
        type="password"
        name="password"
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={
          state?.zodError?.password && state?.zodError.password._errors[0]
        }
        className="my-1 text-left"
      />

      <p className="mb-2.5 text-neutral-900">Re-enter Password</p>
      <input
        type="password"
        name="verifyPassword"
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={
          state?.zodError?.verifyPassword &&
          state?.zodError.verifyPassword._errors[0]
        }
        className="my-1 text-left"
      />

      <input name="resetPasswordUrl" value={resetPasswordUrl} hidden readOnly />

      <ButtonSubmitFormAction className="mb-10 w-full">
        Submit
      </ButtonSubmitFormAction>
    </form>
  )
}
