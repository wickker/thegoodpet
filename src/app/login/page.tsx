'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'
import { login } from './actions'
import { ServerActionError } from '@/@types/common'
import { LoginForm } from '@/@types/customer'
import { Button, FormErrorMessage } from '@/components/common'
import { Route } from '@/utils/constants/routes'

export default function LoginPage() {
  const [state, formAction] = useFormState<
    ServerActionError<LoginForm>,
    FormData
  >(login, { error: null })

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
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
            message={state.error?.email && state.error.email._errors[0]}
            styles="text-left mt-2 mb-3"
          />

          <p className="mb-2.5 text-neutral-900">Password</p>
          <input
            type="password"
            name="password"
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state.error?.password && state.error.password._errors[0]}
            styles="text-left mt-2 mb-3"
          />

          <p className="mb-16 text-sm text-neutral-900">
            Don't have an account? {/* TODO: Link this to account setup page */}
            <Link href={Route.LEARN} className="text-primary underline">
              Sign up
            </Link>
          </p>

          <Button width="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
