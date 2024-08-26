import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/ResetPassword'

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-122px)] max-w-[800px] flex-col items-center p-[15px]">
      <h1 className="mb-5 font-fredoka text-4xl font-medium text-secondary">
        Reset Password
      </h1>

      <div className="w-full max-w-[360px]">
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
