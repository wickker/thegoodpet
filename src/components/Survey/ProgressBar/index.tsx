import { FaCat } from 'react-icons/fa'

type ProgressBarProps = {
  percent?: number
}

export default function ProgressBar({ percent = 0 }: ProgressBarProps) {
  return (
    <div className="grid gap-3">
      {/* TODO: Update correct asset */}
      <FaCat
        className="relative h-7 w-7 -translate-x-[14px] text-orange-400 transition-[left]"
        style={{
          left: `${percent}%`,
        }}
      />

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
