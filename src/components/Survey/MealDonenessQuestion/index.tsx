'use client'

import { useContext, useState } from 'react'
import { SurveyMealDoneness } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { OptionCard, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { MealDoneness } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function MealDonenessQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const setMealDoneness = (mealDoneness: MealDoneness) => {
    setSurveyData((data) => ({ ...data, mealDoneness }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyMealDoneness.parse(surveyData.mealDoneness)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">
        Would {capitalize(surveyData.name || '')} like a raw or gently cooked
        meal?
      </p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-2">
        {Object.values(MealDoneness).map((doneness) => (
          <OptionCard
            key={doneness}
            label={doneness}
            isSelected={surveyData.mealDoneness === doneness}
            onClick={() => setMealDoneness(doneness)}
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
