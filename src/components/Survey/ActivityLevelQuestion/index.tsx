'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyActivityLevel } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function ActivityLevelQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const setActivityLevel = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({
      ...data,
      activityLevel: parseInt(e.target.value),
    }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyActivityLevel.parse(surveyData.activityLevel)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">
        How active is {capitalize(surveyData.name || '')}?
      </p>

      <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center">
        <div className="px-8">
          <input
            type="range"
            min="1"
            max="5"
            defaultValue={surveyData.activityLevel || 3}
            className="slider"
            onChange={setActivityLevel}
          />
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <p>Less Active</p>
          <p>More Active</p>
        </div>
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
