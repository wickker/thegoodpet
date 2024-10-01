'use client'

import { Suspense, useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { login } from './actions'
import {
  ButtonGoogleSSO,
  ButtonSubmitFormAction,
  FormErrorMessage,
} from '@/components/common'
import { SignUpLink } from '@/components/Login'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { Route } from '@/utils/constants/routes'

export default function LoginPage() {
  const { notification } = useContext(NotificationsContext)
  const [state, formAction] = useFormState(login, undefined)

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }
  }, [state?.error])

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center overflow-x-hidden p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Login
      </h1>

      <div className="w-full max-w-[360px]">
        <form action={formAction}>
          <p className="mb-2.5 text-neutral-900">Email</p>
          <input
            type="text"
            name="email"
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state?.zodError?.email && state.zodError.email._errors[0]}
            className="mb-3 mt-2 text-left"
          />

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
            Login
          </ButtonSubmitFormAction>
        </form>

        <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-x-1 text-sm text-neutral-300">
          <hr className="border-0 border-t border-t-neutral-300" />
          OR
          <hr className="border-0 border-t border-t-neutral-300" />
        </div>

        <Suspense>
          <ButtonGoogleSSO callbackPath="/api/google/login">
            Login with Google
          </ButtonGoogleSSO>
        </Suspense>

        <div className="flex flex-col items-center gap-y-4 py-8">
          <p className="text-sm text-neutral-900">
            Don't have an account?{' '}
            <Suspense>
              <SignUpLink />
            </Suspense>
          </p>

          <p className="text-sm text-neutral-900">
            Forgot password?{' '}
            <a className="text-primary underline" href={Route.FORGOT_PASSWORD}>
              Reset
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
