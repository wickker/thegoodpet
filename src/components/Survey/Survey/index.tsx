'use client'

import { useContext } from 'react'
import { ProgressBar } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize } from '@/utils/functions/common'

export default function Survey() {
  const { currentStep, surveyComponents, surveyData } =
    useContext(SurveyContext)
  const progressPercent = (currentStep / (surveyComponents.length - 1)) * 100
  const CurrentQuestion = surveyComponents[currentStep]

  const surveyHeader = () => {
    if (currentStep < 3) {
      return 'About your pet'
    }

    const petName = capitalize(surveyData.name || '')

    if (currentStep < 9) {
      return `About ${petName}`
    }

    if (currentStep < 12) {
      return `${petName}'s Meal`
    }

    if (currentStep < 13) {
      return `Build ${petName}'s meal`
    }

    return `${petName}'s meal is ready`
  }

  return (
    <>
      <div className="sticky top-[120px] bg-background">
        <ProgressBar percent={progressPercent} />
      </div>

      <div className="mt-5">
        <h1 className="text-center font-fredoka text-4xl font-medium text-secondary">
          {surveyHeader()}
        </h1>

        <div className="pb-24 md:pb-0">
          <CurrentQuestion>
            {/*TODO: Change to dynamic pet overlay component */}
            {/* <img src="/cat-vector.svg" className="mx-auto w-full max-w-[400px]" /> */}
          </CurrentQuestion>
        </div>
      </div>
    </>
  )
}
