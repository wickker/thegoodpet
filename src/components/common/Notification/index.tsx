'use client'

import { useContext } from 'react'
import {
  BsCheckCircleFill,
  BsExclamationCircleFill,
  BsFillInfoCircleFill,
  BsFillXCircleFill,
  BsXLg,
} from 'react-icons/bs'
import {
  NotificationType,
  NotificationsContext,
} from '@/contexts/NotificationsProvider'

export default function Notification() {
  const { notification, notifications } = useContext(NotificationsContext)

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.error:
        return (
          <BsFillXCircleFill className="h-[25px] w-[25px] text-[#fa002c]" />
        )
      case NotificationType.warn:
        return (
          <BsExclamationCircleFill className="h-[25px] w-[25px] text-[#ff7700]" />
        )
      case NotificationType.success:
        return (
          <BsCheckCircleFill className="h-[25px] w-[25px] text-[#00992E]" />
        )
      case NotificationType.info:
      default:
        return (
          <BsFillInfoCircleFill className="h-[25px] w-[25px] text-[#1d74bb]" />
        )
    }
  }

  return (
    <div className="fixed top-0 z-30 flex max-h-dvh w-full justify-center">
      <div className="flex w-[800px] flex-col items-center gap-y-2 p-[15px]">
        {notifications.map(({ id, type, title, message }) => (
          <div
            className="grid w-full grid-cols-[auto_1fr_auto] gap-x-3 rounded-md bg-[#4c4c4c] p-[10px]"
            key={id}
          >
            <div className="h-[25px] w-[25px] rounded-full bg-white">
              {renderIcon(type)}
            </div>

            <div className="flex flex-col text-white">
              <p>{title}</p>
              <p className="font-light">{message}</p>
            </div>

            <button className="h-fit" onClick={() => notification.close(id)}>
              <BsXLg className="h-[25px] w-[25px] text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
