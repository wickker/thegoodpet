'use client'

import { useContext, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFormState } from 'react-dom'
import { signUp } from '@/app/account-setup/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { Colors } from '@/utils/constants/common'

export default function AccountSetupForm() {
  const [state, formAction] = useFormState(signUp, undefined)
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
    <form action={formAction}>
      <p className="mb-2.5 text-neutral-900">Email</p>
      <input
        type="text"
        name="email"
        // defaultValue='' TODO: Read from local storage / cookie and autofill
        className="block w-full rounded-lg border px-3 py-2 outline-secondary"
      />
      <FormErrorMessage
        message={state?.zodError?.email && state?.zodError.email._errors[0]}
        className="my-1 text-left"
      />

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

      <div className="flex justify-between">
        <p className="mb-2.5 text-neutral-900">Mobile Number</p>
        <p className="text-neutral-400">optional</p>
      </div>
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
          (state?.zodError?.mobileNumber &&
            state?.zodError.mobileNumber._errors[0]) ||
          (state?.zodError?.countryCode &&
            state?.zodError.countryCode._errors[0])
        }
        className="my-1 text-left"
      />

      <p className="text-justify text-sm">
        We'd love to send you free samples, new product updates and news from us
        and our partners. Sounds good?
      </p>
      <div className="mt-3 flex justify-around">
        {[true, false].map((v) => (
          <label className="flex gap-2" key={v.toString()}>
            <input
              type="radio"
              name="acceptsMarketing"
              value={String(v)}
              defaultChecked={v}
              style={{ accentColor: Colors.primary }}
            />
            {v ? 'Yes' : 'No'}
          </label>
        ))}
      </div>
      <FormErrorMessage
        message={
          state?.zodError?.acceptsMarketing &&
          state?.zodError.acceptsMarketing._errors[0]
        }
        className="my-1 text-left"
      />

      <input name="origin" value={origin} hidden readOnly />

      <ButtonSubmitFormAction className="mb-10 w-full">
        Submit
      </ButtonSubmitFormAction>
    </form>
  )
}
