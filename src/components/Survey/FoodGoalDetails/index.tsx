'use client'

import { useContext } from 'react'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize } from '@/utils/functions/common'

export default function FoodGoalDetails() {
  const { nextStep, prevStep, surveyData } = useContext(SurveyContext)

  return (
    <>
      <p className="my-5 text-center font-inter">
        Thank you for sharing that. {capitalize(surveyData.name || '')}
      </p>

      <div className="mx-auto flex w-max max-w-[360px] flex-col justify-center gap-3">
        {surveyData.foodGoal} Details
      </div>

      <SurveyFooter onBack={prevStep} onNext={nextStep} />
    </>
  )
}
