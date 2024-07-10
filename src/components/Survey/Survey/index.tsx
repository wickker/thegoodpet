'use client'
import { useContext } from 'react'
import { ProgressBar } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'

export default function Survey() {
  const { currentStep, surveyComponents } = useContext(SurveyContext)
  const progressPercent = (currentStep / (surveyComponents.length - 1)) * 100

  return (
    <>
      <ProgressBar percent={progressPercent} />

      <div className="mt-5">
        <h1 className="text-center font-fredoka text-4xl font-medium text-secondary">
          About your pet
        </h1>

        {surveyComponents[currentStep]}
      </div>
    </>
  )
}
