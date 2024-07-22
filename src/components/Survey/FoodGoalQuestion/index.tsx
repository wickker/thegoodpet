'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyFoodGoal } from '@/@types/survey'
import { FormErrorMessage, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

const goalOptions = [
  'Helps him manage his weight',
  'Has timely delivery',
  'Keeps him in good health',
  'Contains the proper ingredients',
  'Has a taste he loves',
  'Other',
]

export default function FoodGoalQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [foodGoal, _setFoodGoal] = useState<string>('')
  const [otherOption, _setOtherOption] = useState<string>('')
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const setFoodGoal = (e: ChangeEvent<HTMLInputElement>) => {
    _setFoodGoal(e.target.value)
    setErrorDisplay('')
  }

  const setOtherOption = (e: ChangeEvent<HTMLInputElement>) => {
    _setOtherOption(e.target.value)
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      if (foodGoal === goalOptions[goalOptions.length - 1]) {
        SurveyFoodGoal.parse(otherOption)
        setSurveyData((data) => ({ ...data, foodGoal: otherOption }))
      } else {
        SurveyFoodGoal.parse(foodGoal)
        setSurveyData((data) => ({ ...data, foodGoal }))
      }
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">
        What's the most important thing about{' '}
        {capitalize(surveyData.name || '')}'s food?
      </p>

      <div className="mx-auto flex w-max max-w-[360px] flex-col justify-center gap-3">
        {goalOptions.map((goal) => (
          <label key={goal} className="flex gap-2">
            <input
              type="radio"
              name="food_goal"
              value={goal}
              onChange={setFoodGoal}
            />
            {goal}
          </label>
        ))}
        <input
          type="text"
          onChange={setOtherOption}
          className="ml-5 block w-full rounded-lg border px-3 py-2 outline-secondary"
          placeholder="If other, specify here"
          disabled={foodGoal !== goalOptions[goalOptions.length - 1]}
        />
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
