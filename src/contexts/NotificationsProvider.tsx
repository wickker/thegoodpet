'use client'

import { PropsWithChildren, createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { BaseError } from '@/@types/common'

type Notification = BaseError & { id: string; type: NotificationType }

export const NotificationType = {
  error: 'ERROR',
  warn: 'WARN',
  info: 'INFO',
  success: 'SUCCESS',
} as const

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType]

type NotificationsContextSchema = {
  notification: {
    error: (e: BaseError) => void
    warn: (e: BaseError) => void
    success: (e: BaseError) => void
    info: (e: BaseError) => void
    close: (id: string) => void
  }
  notifications: Array<Notification>
}

export const NotificationsContext = createContext<NotificationsContextSchema>({
  notification: {
    error: () => {},
    warn: () => {},
    success: () => {},
    info: () => {},
    close: () => {},
  },
  notifications: [],
})

export default function NotifcationsProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<Array<Notification>>([])

  const add = (content: BaseError, type: NotificationType) => {
    const id = nanoid()
    setNotifications((prev) => [...prev, { ...content, id, type }])
    setTimeout(() => {
      remove(id)
    }, 3000)
  }

  const remove = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id))

  const notification = {
    error: (content: BaseError) => add(content, NotificationType.error),
    warn: (content: BaseError) => add(content, NotificationType.warn),
    success: (content: BaseError) => add(content, NotificationType.success),
    info: (content: BaseError) => add(content, NotificationType.info),
    close: (id: string) => remove(id),
  }

  return (
    <NotificationsContext.Provider value={{ notification, notifications }}>
      {children}
    </NotificationsContext.Provider>
  )
}
