'use client'

import { useContext, useState } from 'react'
import { SurveyGender } from '@/@types/survey'
import { FormErrorMessage, OptionCard, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Gender } from '@/utils/constants/db'
import { isZodError } from '@/utils/functions/common'

export default function GenderQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetGender = (gender: Gender) => {
    setSurveyData((data) => ({ ...data, gender }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyGender.parse(surveyData.gender)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">Select pet's gender</p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-2">
        {Object.values(Gender).map((gender) => (
          <OptionCard
            key={gender}
            label={gender}
            isSelected={surveyData.gender === gender}
            onClick={() => handleSetGender(gender)}
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
