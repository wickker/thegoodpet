'use client'

import { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/common'

export default function SubmitButton({ children }: PropsWithChildren) {
  const { pending } = useFormStatus() // needs to be a child component of a form

  return (
    <Button
      className="mb-10 w-full"
      type="submit"
      isLoading={pending}
      disabled={pending}
    >
      {children}
    </Button>
  )
}
