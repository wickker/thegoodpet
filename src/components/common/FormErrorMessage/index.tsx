import { mc } from '@/utils/functions/common'

type FormErrorMessageProps = {
  message?: string
  styles?: string
}

export default function FormErrorMessage({
  message,
  styles,
}: FormErrorMessageProps) {
  return (
    <div
      className={mc(
        'mt-3 min-h-6 text-center text-xs text-red-500 opacity-0 transition-opacity',
        message && 'opacity-100',
        styles,
      )}
    >
      {message}
    </div>
  )
}
