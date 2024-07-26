import { capitalize, mc } from '@/utils/functions/common'

type IngredientTileProps = {
  label: string
  isSelected?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function IngredientTile({
  label,
  isSelected,
  disabled,
  onClick,
  ...rest
}: IngredientTileProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    onClick && onClick(e)
  }

  return (
    <button
      className={mc(
        'grid aspect-square w-full items-center justify-center rounded-lg bg-white text-sm transition-all md:active:scale-90',
        isSelected &&
          'bg-secondary text-white active:scale-90 md:active:scale-100',
        disabled &&
          'cursor-not-allowed bg-neutral-300 active:scale-100 md:active:scale-100',
      )}
      onClick={handleClick}
      {...rest}
    >
      {capitalize(label)}
    </button>
  )
}
