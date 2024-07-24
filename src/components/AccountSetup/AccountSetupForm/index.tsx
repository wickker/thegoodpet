'use client'

import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { ServerActionError } from '@/@types/common'
import { SignUpForm } from '@/@types/customer'
import { signUp } from '@/app/account-setup/actions'
import { Button, FormErrorMessage } from '@/components/common'

export default function AccountSetupForm() {
  const [state, formAction] = useFormState<
    ServerActionError<SignUpForm>,
    FormData
  >(signUp, { zodError: null })
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin') || ''

  return (
    <form action={formAction}>
      <p className="mb-2.5 text-neutral-900">Email</p>
      <input
        type="text"
        name="email"
        // defaultValue='' TODO: Read from local storage / cookie and autofill
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={state.zodError?.email && state.zodError.email._errors[0]}
        className="my-1 text-left"
      />

      <p className="mb-2.5 text-neutral-900">First Name</p>
      <input
        type="text"
        name="firstName"
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={
          state.zodError?.firstName && state.zodError.firstName._errors[0]
        }
        className="my-1 text-left"
      />

      <p className="mb-2.5 text-neutral-900">Last Name</p>
      <input
        type="text"
        name="lastName"
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={state.zodError?.lastName && state.zodError.lastName._errors[0]}
        className="my-1 text-left"
      />

      <p className="mb-2.5 text-neutral-900">Password</p>
      <input
        type="password"
        name="password"
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={state.zodError?.password && state.zodError.password._errors[0]}
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
          state.zodError?.verifyPassword &&
          state.zodError.verifyPassword._errors[0]
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
          (state.zodError?.mobileNumber &&
            state.zodError.mobileNumber._errors[0]) ||
          (state.zodError?.countryCode && state.zodError.countryCode._errors[0])
        }
        className="my-1 text-left"
      />

      <input name="origin" value={origin} hidden readOnly />

      <Button width="w-full mb-10" type="submit">
        Submit
      </Button>
    </form>
  )
}
