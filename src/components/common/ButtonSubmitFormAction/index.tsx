'use client'

import { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/common'

type ButtonSubmitFormActionProps = {
  className?: string
} & PropsWithChildren

export default function ButtonSubmitFormAction({
  children,
  className,
}: ButtonSubmitFormActionProps) {
  const { pending } = useFormStatus() // needs to be a child component of a form

  return (
    <Button
      className={className}
      type="submit"
      isLoading={pending}
      disabled={pending}
    >
      {children}
    </Button>
  )
}
