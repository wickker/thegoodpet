'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyWeightGoal } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { WEIGHT_GOALS } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function WeightGoalQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetWeightGoal = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData({ ...surveyData, weightGoal: parseInt(e.target.value) })
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
        {WEIGHT_GOALS.map((goal, index) => (
          <label key={goal} className="flex gap-2">
            <input
              type="radio"
              name="weight_goal"
              value={index + 1}
              onChange={handleSetWeightGoal}
              defaultChecked={surveyData.weightGoal === index + 1}
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
