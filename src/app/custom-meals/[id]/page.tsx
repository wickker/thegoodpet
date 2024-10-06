'use client'

import { AnimatePresence } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Header, NotFound } from '@/components/common'
import { MealDetails, MealDetailsSkeleton } from '@/components/CustomMeals'
import useCustomMeal from '@/hooks/query/useCustomMeal'

export default function CustomMealsPage() {
  const params = useParams<{ id: string }>()
  const { useGetCustomMealQuery } = useCustomMeal()
  const getCustomMeal = useGetCustomMealQuery(params.id)

  return (
    <>
      <Header />

      <div className="min-h-[calc(100dvh-122px)]">
        <div className="mx-auto max-w-[1200px] px-[15px] pb-[15px]">
          <AnimatePresence>
            {getCustomMeal.isFetching ? (
              <MealDetailsSkeleton />
            ) : getCustomMeal.data ? (
              <MealDetails
                survey={getCustomMeal.data.survey}
                product={getCustomMeal.data.product}
              />
            ) : (
              <div className="mt-3">
                <NotFound />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
