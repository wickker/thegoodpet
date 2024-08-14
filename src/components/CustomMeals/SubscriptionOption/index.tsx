type SubscriptionOptionProps = {
  title: string
  value?: string
  discount?: string
}

export default function SubscriptionOption({
  title,
  value = '',
  discount = '',
}: SubscriptionOptionProps) {
  return (
    <label className="flex cursor-pointer flex-col justify-center gap-1 rounded-lg border-2 border-neutral-200 p-2 text-sm transition-colors has-[:checked]:border-primary">
      <input
        type="radio"
        name="sellingPlanId"
        value={value}
        className="hidden"
        defaultChecked={value === ''}
      />

      {value && <p className="text-xs text-neutral-400">Subscription</p>}

      <div className="flex justify-between gap-1 md:flex-col">
        <p>{title}</p>
        {discount && (
          <span className="w-fit rounded-sm bg-[#F5C757] px-2 py-0.5 text-xs">
            {discount}
          </span>
        )}
      </div>
    </label>
  )
}
