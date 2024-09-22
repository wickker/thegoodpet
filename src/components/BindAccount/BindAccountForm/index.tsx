'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { bindAccountAndLogin } from '@/app/bind-account/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { Route } from '@/utils/constants/routes'

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
    <>
      <p className="mb-2">
        We've detected that an account already exists for {}.
      </p>
      <p className="mb-5">
        Please enter your password below if you would like to bind your Google
        account to the existing account. Alternatively,{' '}
        <a className="cursor-pointer text-primary underline" href={Route.LOGIN}>
          login
        </a>{' '}
        with your existing account credentials.
      </p>

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

          <ButtonSubmitFormAction className="w-full">
            Bind account
          </ButtonSubmitFormAction>
        </form>
      </div>
    </>
  )
}
