import * as Dialog from '@radix-ui/react-dialog'
import { BsXLg } from 'react-icons/bs'

export default function PrivacyPolicy() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-full text-sm text-primary underline">
          Privacy policy
        </button>
      </Dialog.Trigger>

      <Dialog.Portal container={document.getElementById('pets-main')}>
        <div className="fixed inset-0 z-10 grid place-items-center bg-black bg-opacity-70">
          <Dialog.Content className="flex h-full w-full flex-col bg-white px-4 py-8 md:h-[70%] md:w-[70%] md:rounded-md">
            <div className="mb-4 flex justify-end">
              <Dialog.Close asChild>
                <button>
                  <BsXLg className="text-[25px]" />
                </button>
              </Dialog.Close>
            </div>

            <iframe
              src="privacy-policy.html"
              className="scrollbar flex h-full w-full"
              referrerPolicy="no-referrer"
            />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
