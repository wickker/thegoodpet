'use client'

import { useContext, useState } from 'react'
import { SurveyAllergicOmitIngredients } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { IngredientTile, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Ingredient } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function AllergicIngredientsQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [selectedIngredients, _setSelectedIngredients] = useState<
    Array<Ingredient>
  >(surveyData.allergicIngredients || [])
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const setSelectedIngredients = (ingredient: Ingredient) => {
    setErrorDisplay('')
    if (selectedIngredients.includes(ingredient)) {
      _setSelectedIngredients(
        selectedIngredients.filter((i) => i !== ingredient),
      )
      return
    }

    _setSelectedIngredients((ingredients) =>
      [...ingredients, ingredient].sort(),
    )
  }

  const handleNext = () => {
    try {
      SurveyAllergicOmitIngredients.parse(selectedIngredients)
      setSurveyData({
        ...surveyData,
        allergicIngredients: selectedIngredients,
      })
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">
        Are there any ingredients {capitalize(surveyData.name || '')} is
        allergic to?
      </p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-4 gap-2">
        {Object.values(Ingredient).map((i) => (
          <IngredientTile
            label={i}
            key={i}
            onClick={() => setSelectedIngredients(i)}
            isSelected={selectedIngredients.includes(i)}
            disabled={
              (i === Ingredient.BEEF &&
                selectedIngredients.includes(Ingredient.CHICKEN)) ||
              (i === Ingredient.CHICKEN &&
                selectedIngredients.includes(Ingredient.BEEF))
            }
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onNext={handleNext} onBack={prevStep} />
    </>
  )
}
