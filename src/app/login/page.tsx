'use client'

import { Suspense, useContext } from 'react'
import { useFormState } from 'react-dom'
import { login } from './actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { SignUpLink } from '@/components/Login'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function LoginPage() {
  const [state, formAction] = useFormState(login, undefined)
  const { notification } = useContext(NotificationsContext)

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Login
      </h1>

      <button
        onClick={() =>
          notification.error({
            title: 'Error',
            message: 'Do not show me bubble tea pictures',
          })
        }
      >
        Add
      </button>

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

          <p className="mb-8 text-sm text-neutral-900">
            Don't have an account?{' '}
            <Suspense>
              <SignUpLink />
            </Suspense>
          </p>

          {/* TODO: Change this to notification */}
          <FormErrorMessage
            message={
              state?.error && `${state.error.title}: ${state.error.message}`
            }
            className="mb-8 mt-0"
          />

          <ButtonSubmitFormAction className="w-full">
            Login
          </ButtonSubmitFormAction>
        </form>
      </div>
    </div>
  )
}
