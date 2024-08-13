import { useContext, useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { GetProductVariantResponse } from '@/@types/product'
import { SurveyData } from '@/@types/survey'
import { addToCart } from '@/app/custom-meals/[id]/actions'
import { ButtonSubmitFormAction } from '@/components/common'
import { AddToCartModal, SubscriptionOption } from '@/components/CustomMeals'
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
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] =
    useState<boolean>(false)
  const petName = survey.name
  const pronoun = survey.gender === 'MALE' ? 'he' : 'she'

  const handleToggleOptionsModal = () => setIsAddToCartModalVisible((c) => !c)

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }

    if (state?.success) {
      setIsAddToCartModalVisible(false)
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

        <div className="grid gap-4">
          <p>
            Give {petName} the nutrition {pronoun} deserves with our
            Tailored-Made Meal. Our service is designed to provide personalized,
            high-quality meals that support your pet’s health and happiness.
          </p>

          <div>
            This product includes:
            <br />
            <ul className="list-inside list-disc">
              {product.productVariant.displayName
                .split('/')[2]
                .split('|')
                .map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
          </div>

          <p>
            With our Tailored-Made Meal, you're not just feeding your pet;
            you're investing in their well-being. Our personalized meals are
            designed to promote optimal health and vitality. Treat your pet to
            the luxury of custom-crafted meals and see the difference in their
            life.
          </p>
        </div>

        <form action={formAction}>
          <input
            type="hidden"
            value={product.productVariant.id}
            name="merchandiseId"
          />

          <div className="hidden md:block">
            <label>Purchase Options</label>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <SubscriptionOption title="One-time purchase" />
              {SHOPIFY_CUSTOM_MEAL_SELLING_PLANS.map((sellingPlanDetails) => (
                <SubscriptionOption
                  key={sellingPlanDetails.value}
                  {...sellingPlanDetails}
                />
              ))}
            </div>
          </div>

          {/* Desktop Button */}
          <div className="min-h-[45px]">
            <ButtonSubmitFormAction className="mt-6 hidden w-full md:flex">
              Add to cart
            </ButtonSubmitFormAction>
          </div>

          {/* Mobile Button */}
          <button
            onClick={handleToggleOptionsModal}
            className="fixed bottom-0 left-0 right-0 bg-primary p-[15px] text-center text-lg text-white md:hidden"
            type="button"
          >
            Add to cart
          </button>
        </form>

        <AddToCartModal
          isVisible={isAddToCartModalVisible}
          onClose={handleToggleOptionsModal}
          productId={product.productVariant.id}
          submitAction={formAction}
        />
      </div>
    </div>
  )
}
