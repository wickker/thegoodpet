import { Suspense } from 'react'
import { AccountSetupForm } from '@/components/AccountSetup'
import { ButtonGoogleSSO } from '@/components/common'

export default function AccountSetupPage() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Account Setup
      </h1>

      <div className="mt-4 w-full max-w-[360px]">
        <Suspense>
          <AccountSetupForm />
        </Suspense>

        <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-x-1 text-sm text-neutral-300">
          <hr className="border-0 border-t border-t-neutral-300" />
          OR
          <hr className="border-0 border-t border-t-neutral-300" />
        </div>

        <Suspense>
          <ButtonGoogleSSO callbackPath="/api/google/sign-up" className="mb-10">
            Sign up with Google
          </ButtonGoogleSSO>
        </Suspense>
      </div>
    </div>
  )
}
