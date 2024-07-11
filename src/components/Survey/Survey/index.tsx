'use client'

import { useContext } from 'react'
import { ProgressBar } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'

export default function Survey() {
  const { currentStep, surveyComponents } = useContext(SurveyContext)
  const progressPercent = (currentStep / (surveyComponents.length - 1)) * 100
  const CurrentQuestion = surveyComponents[currentStep]

  return (
    <>
      <ProgressBar percent={progressPercent} />

      <div className="mt-5">
        <h1 className="text-center font-fredoka text-4xl font-medium text-secondary">
          About your pet
        </h1>

        <CurrentQuestion>
          {/*TODO: Change to dynamic pet overlay component */}
          <img src="/cat-vector.svg" className="mx-auto w-full max-w-[400px]" />
        </CurrentQuestion>
      </div>
    </>
  )
}
