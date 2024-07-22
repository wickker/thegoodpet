'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyWeightGoal } from '@/@types/survey'
import { FormErrorMessage, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { WEIGHT_GOALS } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function WeightGoalQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetWeightGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({ ...data, weightGoal: e.target.value }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyWeightGoal.parse(surveyData.weightGoal)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }
  return (
    <>
      <p className="my-5 text-center font-inter">
        What does {capitalize(surveyData.name || '')} need?
      </p>

      <div className="mx-auto flex w-max max-w-[360px] flex-col justify-center gap-4">
        {WEIGHT_GOALS.map((goal) => (
          <label key={goal} className="flex gap-2">
            <input
              type="radio"
              name="weight_goal"
              value={goal}
              onChange={handleSetWeightGoal}
            />
            {goal}
          </label>
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
