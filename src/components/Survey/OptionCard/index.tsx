import { capitalize, mc } from '@/utils/functions/common'

type OptionCardProps = {
  isSelected: boolean
  label: string
  onClick: () => void
}

export default function OptionCard({
  label,
  isSelected,
  ...rest
}: OptionCardProps) {
  return (
    <button
      className={mc(
        'grid h-44 w-full max-w-36 items-center justify-center place-self-center rounded-lg bg-white transition-colors',
        'hover:bg-secondary hover:text-white',
        isSelected && 'bg-secondary text-white',
      )}
      {...rest}
    >
      {capitalize(label)}
    </button>
  )
}
