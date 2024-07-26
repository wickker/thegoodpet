'use client'

import { useContext, useMemo, useState } from 'react'
import { BsDash, BsPlus } from 'react-icons/bs'
import { FormErrorMessage } from '@/components/common'
import { IngredientTile, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Ingredient, PetType } from '@/utils/constants/db'
import { capitalize } from '@/utils/functions/common'
import { getMealMetrics } from '@/utils/functions/meal'

export default function BuildYourBoxQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [selectedIngredients, setSelectedIngredients] =
    useState(getInitialData())
  const totalPacks = Object.values(selectedIngredients).reduce(
    (total, curr) => total + curr,
    0,
  )
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const { DER } = useMemo(
    () =>
      getMealMetrics(
        surveyData.weight || 0,
        surveyData.petType || PetType.DOG,
        (surveyData.ageMonth || 0) + (surveyData.ageYear || 0) * 12,
        surveyData.isNeutered || false,
        surveyData.weightGoal || 3,
        surveyData.activityLevel || 3,
      ),
    [surveyData],
  )

  // named function for hoisting
  function getInitialData(): Record<Ingredient, number> {
    const data = {} as Record<Ingredient, number>

    Object.values(Ingredient).forEach((i) => {
      const initialValue = surveyData.mealTypeToQuantity
        ? surveyData.mealTypeToQuantity[i] || 0
        : 0
      data[i] = initialValue
    })

    return data
  }

  const handleIncreaseQuantity = (i: Ingredient) => {
    const packsLeft = 14 - (totalPacks - selectedIngredients[i])
    setSelectedIngredients((current) => ({
      ...current,
      [i]: Math.min(packsLeft, current[i] + 1),
    }))
    setErrorDisplay('')
  }

  const handleDecreaseQuantity = (i: Ingredient) => {
    setSelectedIngredients((current) => ({
      ...current,
      [i]: Math.max(0, current[i] - 1),
    }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    if (totalPacks !== 14) {
      setErrorDisplay(`Please select ${14 - totalPacks} more items`)
      return
    }
    setSurveyData((data) => ({ ...data, meatSelection: selectedIngredients }))
    nextStep()
  }

  return (
    <>
      <div className="mx-auto w-full max-w-[460px]">
        <p className="my-5 text-justify">
          Based on our calculations, {capitalize(surveyData.name || '')} will
          need {DER.toFixed(2)} calories daily. Our food packs will be adjusted
          accordingly.
          <br />
          <br />A subscription meal accounts for 2 weeks worth of food. Please
          select your 14 day combination.
        </p>

        <FormErrorMessage message={errorDisplay} />

        <div className="grid w-full grid-cols-3 gap-x-2 gap-y-5">
          {Object.values(Ingredient)
            .filter(
              (i) =>
                ![
                  ...(surveyData.allergicIngredients || []),
                  ...(surveyData.omitIngredients || []),
                ].includes(i),
            )
            .map((i) => (
              <div className="grid w-[90px] justify-self-center" key={i}>
                <div>
                  <IngredientTile label={i} key={i} />
                </div>

                {(
                  [Ingredient.DUCK, Ingredient.LAMB] as Array<Ingredient>
                ).includes(i) ? (
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
                      {selectedIngredients[i]}
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

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
