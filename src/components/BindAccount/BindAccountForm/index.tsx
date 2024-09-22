'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { bindAccountAndLogin } from '@/app/bind-account/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function BindAccountPage() {
  const [state, formAction] = useFormState(bindAccountAndLogin, undefined)
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin') || ''
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
    <div className="w-full">
      <form action={formAction}>
        <p className="mb-2.5 text-neutral-900">Password</p>
        <input
          type="password"
          name="password"
          className="block w-full rounded-lg border px-3 py-2 outline-secondary"
        />
        <FormErrorMessage
          message={
            state?.zodError?.password && state.zodError.password._errors[0]
          }
          className="mb-3 mt-2 text-left"
        />

        <input value={origin} name="origin" hidden readOnly />

        <ButtonSubmitFormAction className="w-full">
          Bind account
        </ButtonSubmitFormAction>
      </form>
    </div>
  )
}
