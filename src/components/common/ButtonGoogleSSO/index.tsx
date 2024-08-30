'use client'

import { PropsWithChildren, useEffect } from 'react'
import Image from 'next/image'

type ButtonGoogleSSOProps = {
  callbackUrl: string
} & PropsWithChildren

export default function ButtonGoogleSSO({
  children,
  callbackUrl,
}: ButtonGoogleSSOProps) {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="354979892170-2iu8jlqqs4j92takqh12r3ojpt1nm7oi.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-login_uri={callbackUrl}
        data-auto_select="true"
        data-itp_support="true"
      />

      <div className="relative flex w-full items-center justify-center gap-x-2 rounded-full border border-neutral-200 bg-white px-7 py-2.5 text-sm">
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
        <Image
          src="/google-logo.png"
          alt="Google logo"
          width={20}
          height={20}
        />
        {children}
      </div>
    </>
  )
}
