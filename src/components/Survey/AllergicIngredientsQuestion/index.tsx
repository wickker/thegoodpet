'use client'

import { useContext, useState } from 'react'
import { SurveyAllergicOmitIngredients } from '@/@types/survey'
import {
  FormErrorMessage,
  IngredientTile,
  SurveyFooter,
} from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Ingredient } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function AllergicIngredientsQuestion() {
  const { isFirstQuestion, nextStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [selectedIngredients, _setSelectedIngredients] = useState<
    Array<Ingredient>
  >([])
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
      setSurveyData((data) => ({
        ...data,
        allergicIngredients: selectedIngredients,
      }))
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
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onNext={handleNext} hideBackButton={isFirstQuestion} />
    </>
  )
}
