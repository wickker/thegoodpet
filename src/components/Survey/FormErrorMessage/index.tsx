import { mc } from '@/utils/functions/common'

type FormErrorMessageProps = {
  message?: string
}

export default function FormErrorMessage({ message }: FormErrorMessageProps) {
  return (
    <div
      className={mc(
        'mt-3 min-h-6 text-center text-red-500 opacity-0 transition-opacity',
        message && 'opacity-100',
      )}
    >
      {message}
    </div>
  )
}
