'use client'

import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { useContext } from 'react'

export default function Notification() {
  const { notification, notifications } = useContext(NotificationsContext)

  return (
    <div className="fixed top-0 z-30 flex w-full justify-center">
      <div className="flex w-[800px] flex-col items-center gap-y-2 p-[15px]">
        {notifications.map((n) => (
          <div className="h-[100px] w-full bg-yellow-400" key={n.id}>
            {n.title}
            {n.message}
          </div>
        ))}
      </div>
    </div>
  )
}
