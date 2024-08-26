'use client'

import { useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { sendResetPasswordEmail } from './actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function ForgotPasswordPage() {
  const { notification } = useContext(NotificationsContext)
  const [state, formAction] = useFormState(sendResetPasswordEmail, undefined)
  const label = state?.isSuccess
    ? 'Please check your email for instructions to reset your password.'
    : "No worries, we'll send you reset instructions."

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }
  }, [state?.error])

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Forgot Password?
      </h1>

      <p className="mb-8 text-secondary">{label}</p>

      {!state?.isSuccess && (
        <div className="w-full max-w-[360px]">
          <form action={formAction}>
            <p className="mb-2.5 text-neutral-900">Email</p>
            <input
              type="text"
              name="email"
              className="block w-full rounded-lg border px-3 py-2 outline-secondary"
            />
            <FormErrorMessage
              message={
                state?.zodError?.email && state.zodError.email._errors[0]
              }
              className="mb-3 mt-2 text-left"
            />

            <ButtonSubmitFormAction className="w-full">
              Send instructions
            </ButtonSubmitFormAction>
          </form>
        </div>
      )}
    </div>
  )
}
