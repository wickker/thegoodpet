import { Suspense } from 'react'
import { AccountSetupForm } from '@/components/AccountSetup'

export default function AccountSetupPage() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Account Setup
      </h1>

      <div className="w-full max-w-[360px]">
        <Suspense>
          <AccountSetupForm />
        </Suspense>
      </div>
    </div>
  )
}
