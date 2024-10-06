'use client'

import { useFormStatus } from 'react-dom'
import { Loader } from '@/components/common'

type AccountButtonProps = {
  userEmail: string
}

export default function AccountButton({ userEmail }: AccountButtonProps) {
  const { pending } = useFormStatus()

  const label = userEmail ? `Account (${userEmail})` : 'Account'

  return (
    <button className="flex items-center gap-x-2 text-left">
      {pending && <Loader size="sm" />}
      <p className="block w-[calc(100dvw-30px)] truncate">{label}</p>
    </button>
  )
}
