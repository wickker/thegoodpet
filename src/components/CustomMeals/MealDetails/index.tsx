import { useContext, useEffect } from 'react'
import { useFormState } from 'react-dom'
import { GetProductVariantResponse } from '@/@types/product'
import { SurveyData } from '@/@types/survey'
import { addToCart } from '@/app/custom-meals/[id]/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { CartContext } from '@/contexts/CartProvider'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { SHOPIFY_CUSTOM_MEAL_SELLING_PLANS } from '@/utils/constants/common'

type MealDetailsProps = {
  survey: SurveyData
  product: GetProductVariantResponse
}

export default function MealDetails({ survey, product }: MealDetailsProps) {
  const { notification } = useContext(NotificationsContext)
  const { getCart, openCart } = useContext(CartContext)
  const [state, formAction] = useFormState(addToCart, undefined)
  const petName = survey.name

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }

    if (state?.success) {
      getCart?.refetch().then(() => openCart())
    }
  }, [state])

  return (
    <div className="grid gap-x-8 gap-y-3 md:mt-8 md:grid-cols-[auto_450px]">
      {/* TODO: create image slider component */}
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/600x600/png" className="w-full" />
        <div className="flex gap-2 py-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/60x60/png" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/60x60/png" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/60x60/png" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://placehold.co/60x60/png" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-fredoka text-4xl text-secondary">
          ${product.productVariant.price}
        </h1>

        <h1 className="font-fredoka text-3xl text-secondary">
          {petName}'s Tailor-made Meal
        </h1>

        {/* TODO: clean up product description */}
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quasi
          dolorum vitae eos? Aperiam ab explicabo corporis sed laborum
          doloremque.
        </div>

        {/* TODO: clean up option design */}
        <form action={formAction}>
          <input
            type="hidden"
            value={product.productVariant.id}
            name="merchandiseId"
          />

          <label>Subscription Options</label>
          {SHOPIFY_CUSTOM_MEAL_SELLING_PLANS.map(({ name, value }) => (
            <label className="flex gap-2" key={value}>
              <input type="radio" name="sellingPlanId" value={value} />
              {name}
            </label>
          ))}
          <FormErrorMessage
            message={
              state?.zodError?.sellingPlanId &&
              state.zodError.sellingPlanId._errors[0]
            }
            className="mt-0 text-left"
          />

          <ButtonSubmitFormAction className="w-full">
            Add to cart
          </ButtonSubmitFormAction>
        </form>
      </div>
    </div>
  )
}
