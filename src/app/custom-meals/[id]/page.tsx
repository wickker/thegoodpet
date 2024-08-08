'use client'

import { useParams } from 'next/navigation'
import { MealDetails } from '@/components/CustomMeals'
import useCustomMeal from '@/hooks/query/useCustomMeal'

export default function CustomMealsPage() {
  const params = useParams<{ id: string }>()
  const { useGetCustomMealQuery } = useCustomMeal()
  const customMeal = useGetCustomMealQuery(params.id)

  return (
    <div className="min-h-[calc(100dvh-122px)]">
      <div className="mx-auto max-w-[1200px] px-[15px]">
        {/* TODO: clean up loading state */}
        {/* TODO: clean up error state */}
        {customMeal.isFetching ? (
          <div>Loading</div>
        ) : customMeal.data ? (
          <MealDetails
            survey={customMeal.data.survey}
            product={customMeal.data.product}
          />
        ) : (
          <div>error</div>
        )}

        {/* <div className="text-xs">
          <pre>
            <code>
              {JSON.stringify(customMeal.data?.product, undefined, 2)}
            </code>
          </pre>
          <pre>
            <code>{JSON.stringify(customMeal.data?.survey, undefined, 2)}</code>
          </pre>
        </div> */}
      </div>
    </div>
  )
}
