import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { BindAccountForm } from '@/components/BindAccount'
import { Header } from '@/components/common'
import { BIND_ACCOUNT_EMAIL_COOKIE } from '@/utils/constants/cookies'
import { Route } from '@/utils/constants/routes'

export default function BindAccountPage() {
  const emailCookie = cookies().get(BIND_ACCOUNT_EMAIL_COOKIE)

  return (
    <>
      <Header />

      {emailCookie ? (
        <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[360px] flex-col items-center overflow-x-hidden p-[15px]">
          <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
            Bind Account
          </h1>

          <p className="mb-2">
            We've detected that an account already exists for{' '}
            <span className="text-primary">{emailCookie.value}</span>.
          </p>
          <p className="mb-5">
            Please enter your password below if you would like to bind your
            Google account to the existing account. Alternatively,{' '}
            <a
              className="cursor-pointer text-primary underline"
              href={Route.LOGIN}
            >
              login
            </a>{' '}
            with your existing account credentials.
          </p>

          <Suspense>
            <BindAccountForm />
          </Suspense>
        </div>
      ) : (
        <div className="flex h-[calc(100dvh-122px)] flex-col items-center justify-center text-neutral-500">
          Bind account session expired
        </div>
      )}
    </>
  )
}
