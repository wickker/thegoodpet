import { motion } from 'framer-motion'

export default function MealDetailsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid gap-x-8 gap-y-3 md:mt-8 md:grid-cols-[auto_450px]"
    >
      <div>
        <div className="aspect-square w-full animate-pulse rounded-lg bg-neutral-300" />
        <div className="flex gap-2 py-2">
          <div className="aspect-square w-[60px] animate-pulse rounded-lg bg-neutral-300" />
          <div className="aspect-square w-[60px] animate-pulse rounded-lg bg-neutral-300" />
          <div className="aspect-square w-[60px] animate-pulse rounded-lg bg-neutral-300" />
          <div className="aspect-square w-[60px] animate-pulse rounded-lg bg-neutral-300" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="h-[40px] w-[40%] animate-pulse rounded-full bg-neutral-300" />

        <div className="h-[36px] w-[80%] animate-pulse rounded-full bg-neutral-300" />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="h-[20px] w-full animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[90%] animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[40%] animate-pulse rounded-full bg-neutral-300" />
          </div>

          <div className="grid gap-2">
            <div className="h-[20px] w-full animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[90%] animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[30%] animate-pulse rounded-full bg-neutral-300" />
          </div>

          <div className="grid gap-2">
            <div className="h-[20px] w-full animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[90%] animate-pulse rounded-full bg-neutral-300" />
            <div className="h-[20px] w-[50%] animate-pulse rounded-full bg-neutral-300" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
