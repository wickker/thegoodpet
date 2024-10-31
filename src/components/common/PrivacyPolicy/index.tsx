'use client'

import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useSearchParams } from 'next/navigation'
import { BsXLg } from 'react-icons/bs'
import { mc } from '@/utils/functions/common'

type PrivacyPolicyProps = {
  className?: string
}

export default function PrivacyPolicy({ className }: PrivacyPolicyProps) {
  const [_document, _setDocument] = useState<Document | null>(null)
  const searchParams = useSearchParams()
  const privacyPolicy = searchParams.get('privacyPolicy') || ''
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (window.document) {
      _setDocument(window.document)
    }
  }, [])

  useEffect(() => {
    if (privacyPolicy) {
      setIsVisible(true)
    }
  }, [privacyPolicy])

  return (
    <Dialog.Root open={isVisible} onOpenChange={setIsVisible}>
      <Dialog.Trigger asChild>
        <button
          className={mc(
            'w-full text-sm text-primary underline',
            className && className,
          )}
        >
          Privacy policy
        </button>
      </Dialog.Trigger>

      <Dialog.Portal container={_document?.getElementById('pets-main')}>
        <div className="fixed inset-0 z-10 grid place-items-center bg-black bg-opacity-70">
          <Dialog.Content
            className="flex h-full w-full flex-col bg-white px-4 py-8 md:h-[70%] md:w-[70%] md:rounded-md"
            aria-describedby={undefined}
          >
            <div className="mb-4 flex justify-end">
              <Dialog.Close asChild>
                <button>
                  <BsXLg className="text-[25px]" />
                </button>
              </Dialog.Close>
            </div>

            {/* Required by Radix for accessibility */}
            <VisuallyHidden.Root>
              <Dialog.Title>Privacy Policy</Dialog.Title>
            </VisuallyHidden.Root>

            <iframe
              src="privacy-policy.html"
              className="flex h-full w-full"
              referrerPolicy="no-referrer"
            />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
