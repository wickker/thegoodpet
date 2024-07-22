import { capitalize, mc } from '@/utils/functions/common'

type IngredientTileProps = {
  label: string
  isSelected?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function IngredientTile({
  label,
  isSelected,
  ...rest
}: IngredientTileProps) {
  return (
    <button
      className={mc(
        'grid aspect-square items-center justify-center rounded-lg bg-white text-sm transition-all md:active:scale-90',
        isSelected &&
          'bg-secondary text-white active:scale-90 md:active:scale-100',
      )}
      {...rest}
    >
      {capitalize(label)}
    </button>
  )
}
