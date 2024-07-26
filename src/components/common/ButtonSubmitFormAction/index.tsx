'use client'

import { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/common'

type ButtonSubmitFormActionProps = {
  className?: string
} & PropsWithChildren

export default function ButtonSubmitFormAction({
  children,
  ...rest
}: ButtonSubmitFormActionProps) {
  const { pending } = useFormStatus() // needs to be a child component of a form

  return (
    <Button type="submit" isLoading={pending} disabled={pending} {...rest}>
      {children}
    </Button>
  )
}
