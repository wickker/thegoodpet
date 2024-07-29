'use client'

import { useFormStatus } from 'react-dom'
import { Loader } from '@/components/common'

export default function LogoutButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="flex items-center gap-x-1 text-primary underline"
      disabled={pending}
      type="submit"
    >
      {pending && <Loader size="xs" />}
      Logout
    </button>
  )
}
