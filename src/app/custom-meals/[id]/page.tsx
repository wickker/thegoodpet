'use client'

import { useParams } from 'next/navigation'
import { MealDetails } from '@/components/CustomMeals'
import useCustomMeal from '@/hooks/query/useCustomMeal'

export default function CustomMealsPage() {
  const params = useParams<{ id: string }>()
  const { useGetCustomMealQuery } = useCustomMeal()
  const getCustomMeal = useGetCustomMealQuery(params.id)

  return (
    <div className="min-h-[calc(100dvh-122px)]">
      <div className="mx-auto max-w-[1200px] px-[15px]">
        {/* TODO: clean up loading state */}
        {/* TODO: clean up error state */}
        {getCustomMeal.isFetching ? (
          <div>Loading</div>
        ) : getCustomMeal.data ? (
          <MealDetails
            survey={getCustomMeal.data.survey}
            product={getCustomMeal.data.product}
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
