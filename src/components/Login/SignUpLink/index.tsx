'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Route } from '@/utils/constants/routes'

export default function SignUpLink() {
  const searchParams = useSearchParams()
  const origin = searchParams.get('origin') || ''
  const searchParam = origin ? `?origin=${origin}` : ''

  return (
    <>
      <Link
        href={`${Route.ACCOUNT_SETUP}${searchParam}`}
        className="text-primary underline"
      >
        Sign up
      </Link>

      <input value={origin} name="origin" hidden readOnly />
    </>
  )
}
