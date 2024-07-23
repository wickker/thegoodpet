'use client'

import { useFormState } from 'react-dom'
import { signUp } from './actions'
import { ServerActionError } from '@/@types/common'
import { SignUpForm } from '@/@types/customer'
import { Button, FormErrorMessage } from '@/components/common'

export default function AccountSetupPage() {
  const [state, formAction] = useFormState<
    ServerActionError<SignUpForm>,
    FormData
  >(signUp, { error: null })

  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Account Setup
      </h1>

      <div className="w-full max-w-[360px]">
        <form action={formAction}>
          <p className="mb-2.5 text-neutral-900">Email</p>
          <input
            type="text"
            name="email"
            // defaultValue='' TODO: Read from local storage / cookie and autofill
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state.error?.email && state.error.email._errors[0]}
            className="my-1 text-left"
          />

          <p className="mb-2.5 text-neutral-900">First Name</p>
          <input
            type="text"
            name="firstName"
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state.error?.firstName && state.error.firstName._errors[0]}
            className="my-1 text-left"
          />

          <p className="mb-2.5 text-neutral-900">Last Name</p>
          <input
            type="text"
            name="lastName"
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state.error?.lastName && state.error.lastName._errors[0]}
            className="my-1 text-left"
          />

          <p className="mb-2.5 text-neutral-900">Password</p>
          <input
            type="password"
            name="password"
            className="block w-full rounded-lg border px-3 py-2 outline-secondary"
          />
          <FormErrorMessage
            message={state.error?.password && state.error.password._errors[0]}
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
              state.error?.verifyPassword &&
              state.error.verifyPassword._errors[0]
            }
            className="my-1 text-left"
          />

          <p className="mb-2.5 text-neutral-900">Mobile Number</p>
          <div className="grid w-full grid-cols-[80px_1fr] space-x-2">
            <input
              type="text"
              name="countryCode"
              defaultValue="+65"
              className="block rounded-lg border px-3 py-2 outline-secondary"
            />
            <input
              type="text"
              name="mobileNumber"
              className="block rounded-lg border px-3 py-2 outline-secondary"
            />
          </div>
          <FormErrorMessage
            message={
              (state.error?.mobileNumber &&
                state.error.mobileNumber._errors[0]) ||
              (state.error?.countryCode && state.error.countryCode._errors[0])
            }
            className="my-1 text-left"
          />

          <Button width="w-full mb-10" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
