'use client'

import { useContext, useEffect, useMemo, useState } from 'react'
import { redirect } from 'next/navigation'
import { useFormState } from 'react-dom'
import { BsDash, BsPlus } from 'react-icons/bs'
import { getDefaultNumberPacksPerMeat } from './utils'
import { SurveyData } from '@/@types/survey'
import { createSurveyAndCustomProduct } from '@/app/survey/actions'
import { ButtonSubmitFormAction, FormErrorMessage } from '@/components/common'
import { IngredientTile, SurveyFooter } from '@/components/Survey'
import { NotificationsContext } from '@/contexts/NotificationsProvider'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Ingredient, Species } from '@/utils/constants/db'
import { Route } from '@/utils/constants/routes'
import { capitalize } from '@/utils/functions/common'
import { getMealMetrics } from '@/utils/functions/meal'

export default function BuildYourBoxQuestion() {
  const { clearLocalStorageSurveyData, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const totalPacks = Object.values(surveyData.mealTypeToQuantity || {}).reduce(
    (total, curr) => total + curr,
    0,
  )
  const [errorDisplay, setErrorDisplay] = useState<string>('')
  const createSurveyAndProductWithData = createSurveyAndCustomProduct.bind(
    null,
    surveyData as SurveyData,
  )
  const [state, formAction] = useFormState(
    createSurveyAndProductWithData,
    undefined,
  )
  const { notification } = useContext(NotificationsContext)
  const comingSoonIngredients: Array<Ingredient> = [
    Ingredient.DUCK,
    Ingredient.LAMB,
  ]
  const ingredientsToDisplay = Object.values(Ingredient).filter(
    (i) =>
      ![
        ...(surveyData.allergicIngredients || []),
        ...(surveyData.omitIngredients || []),
      ].includes(i),
  )
  const ingredientsToPack = ingredientsToDisplay.filter(
    (i) => !comingSoonIngredients.includes(i),
  )

  const { DER } = useMemo(
    () =>
      getMealMetrics(
        surveyData.weight || 0,
        surveyData.species || Species.DOG,
        (surveyData.ageMonth || 0) + (surveyData.ageYear || 0) * 12,
        surveyData.isNeutered || false,
        surveyData.weightGoal || 3,
        surveyData.activityLevel || 3,
      ),
    [surveyData],
  )

  const handleIncreaseQuantity = (i: Ingredient) => {
    const currentQuantity = surveyData.mealTypeToQuantity
      ? surveyData.mealTypeToQuantity[i] || 0
      : 0
    const packsLeft = 14 - (totalPacks - currentQuantity)
    const newQuantity = Math.min(packsLeft, currentQuantity + 1)

    setSurveyData({
      ...surveyData,
      mealTypeToQuantity: {
        ...surveyData.mealTypeToQuantity,
        [i]: newQuantity,
      },
    })

    setErrorDisplay('')
  }

  const handleDecreaseQuantity = (i: Ingredient) => {
    const currentQuantity = surveyData.mealTypeToQuantity
      ? surveyData.mealTypeToQuantity[i] || 0
      : 0
    const newQuantity = Math.max(0, currentQuantity - 1)

    setSurveyData({
      ...surveyData,
      mealTypeToQuantity: {
        ...surveyData.mealTypeToQuantity,
        [i]: newQuantity,
      },
    })
    setErrorDisplay('')
  }

  const handleNext = () => {
    if (totalPacks !== 14) {
      setErrorDisplay(`Please select ${14 - totalPacks} more items`)
      return
    }
  }

  const submitFormButton =
    totalPacks === 14 ? (
      <form action={formAction} className="w-full transition-[width] md:w-32">
        <ButtonSubmitFormAction className="w-full">
          Submit
        </ButtonSubmitFormAction>
      </form>
    ) : undefined

  useEffect(() => {
    if (state?.error) {
      notification.error({
        title: state.error.title,
        message: state.error.message,
      })
    }

    if (state?.customMealId) {
      clearLocalStorageSurveyData()
      redirect(`${Route.CUSTOM_MEALS}/${state?.customMealId}`)
    }
  }, [state])

  useEffect(() => {
    setSurveyData({
      ...surveyData,
      mealTypeToQuantity: {
        ...surveyData.mealTypeToQuantity,
        ...getDefaultNumberPacksPerMeat(ingredientsToPack),
      },
    })
  }, [])

  return (
    <>
      <div className="mx-auto w-full max-w-[460px]">
        <p className="my-5 text-justify">
          Based on our calculations, {capitalize(surveyData.name || '')} will
          need{' '}
          <span className="text-lg font-bold text-secondary">
            {DER.toFixed(2)}
          </span>{' '}
          calories daily. Our food packs will be adjusted accordingly.
          <br />
          <br />A subscription meal accounts for 2 weeks worth of food. Please
          select your 14 day combination.
        </p>

        <FormErrorMessage message={errorDisplay} />

        <div className="grid w-full grid-cols-3 gap-x-2 gap-y-5">
          {ingredientsToDisplay.map((i) => (
            <div className="grid w-[90px] justify-self-center" key={i}>
              <div>
                <IngredientTile label={i} key={i} />
              </div>

              {comingSoonIngredients.includes(i) ? (
                <div className="mt-3 grid text-sm">Coming soon</div>
              ) : (
                <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-md bg-neutral-300">
                  <button
                    className="grid aspect-square place-items-center bg-primary text-white"
                    onClick={() => handleDecreaseQuantity(i)}
                  >
                    <BsDash />
                  </button>
                  <p className="grid place-items-center text-sm">
                    {surveyData.mealTypeToQuantity?.[i] || 0}
                  </p>
                  <button
                    className="grid aspect-square place-items-center bg-primary text-white"
                    onClick={() => handleIncreaseQuantity(i)}
                  >
                    <BsPlus />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SurveyFooter
        onBack={prevStep}
        onNext={handleNext}
        nextLabel="Submit"
        customNextButton={submitFormButton}
      />
    </>
  )
}
