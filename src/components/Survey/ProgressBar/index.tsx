import { FaCat } from 'react-icons/fa'

type ProgressBarProps = {
  percent?: number
}

export default function ProgressBar({ percent = 20 }: ProgressBarProps) {
  return (
    <div className="grid gap-3">
      {/* TODO: update correct asset */}
      <FaCat className="h-8 w-8 text-orange-400" />

      <div className="h-2.5 w-full rounded-full bg-neutral-300">
        <div
          className="h-2.5 rounded-full bg-secondary transition-[width]"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>
    </div>
  )
}
