'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { logout } from '@/app/account/actions'
import { LogoutButton } from '@/components/Account'

export default function LogoutForm() {
  const [state, formAction] = useFormState<{ error?: string }, FormData>(
    logout,
    {},
  )

  useEffect(() => {
    if (state.error) {
      // TODO: Change this to show notification
      console.log(state.error)
    }
  }, [state])

  return (
    <form action={formAction}>
      <LogoutButton />
    </form>
  )
}
