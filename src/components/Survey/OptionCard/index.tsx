import { capitalize, mc } from '@/utils/functions/common'

type OptionCardProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean
  label: string
}

export default function OptionCard({
  label,
  isSelected,
  ...rest
}: OptionCardProps) {
  return (
    <button
      className={mc(
        'grid h-44 w-full max-w-36 items-center justify-center place-self-center rounded-lg bg-white transition-all md:active:scale-90',
        isSelected &&
          'bg-secondary text-white active:scale-90 md:active:scale-100',
      )}
      {...rest}
    >
      {capitalize(label)}
    </button>
  )
}
