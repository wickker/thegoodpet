'use client'

import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { BaseError } from '@/@types/common'
import Config from '@/configs'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { mc } from '@/utils/functions/common'

type ButtonGoogleSSOProps = {
  callbackPath: string
  className?: string
} & PropsWithChildren

export default function ButtonGoogleSSO({
  children,
  className,
  callbackPath,
}: ButtonGoogleSSOProps) {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') || ''
  const { notification } = useContext(NotificationsContext)
  const [isGoogleScriptLoading, setIsGoogleScriptLoading] = useState(true)

  useEffect(() => {
    if (error) {
      const err: BaseError = JSON.parse(error)
      notification.error({
        title: err.title,
        message: err.message,
      })
    }
  }, [error])

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => setIsGoogleScriptLoading(false)

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className={className}>
      <div
        id="g_id_onload"
        data-client_id={Config.GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri={`${Config.BASE_URL}${callbackPath}`}
        data-auto_prompt="false"
      />

      <div
        className={mc(
          'relative flex w-full items-center justify-center gap-x-2 rounded-full border border-neutral-200 bg-white px-7 py-2.5 text-sm',
          isGoogleScriptLoading &&
            'h-[43px] animate-pulse rounded-full border-0 bg-neutral-300 p-0',
        )}
      >
        <div
          className="g_id_signin absolute opacity-0"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="center"
          data-width="358"
        />
        {!isGoogleScriptLoading && (
          <>
            <Image
              src="/google-logo.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            {children}
          </>
        )}
      </div>
    </div>
  )
}
