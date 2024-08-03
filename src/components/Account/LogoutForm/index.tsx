'use client'

import { useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { logout } from '@/app/account/actions'
import { LogoutButton } from '@/components/Account'
import { NotificationsContext } from '@/contexts/NotificationsProvider'

export default function LogoutForm() {
  const [state, formAction] = useFormState(logout, undefined)
  const { notification } = useContext(NotificationsContext)

  useEffect(() => {
    if (state?.title) {
      notification.error({
        title: state.title,
        message: state.message,
      })
    }
  }, [state])

  return (
    <form action={formAction}>
      <LogoutButton />
    </form>
  )
}
