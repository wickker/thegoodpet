'use client'

import { useContext, useState } from 'react'
import { SurveyPetType } from '@/@types/survey'
import { FormErrorMessage, OptionCard, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { PetType } from '@/utils/constants/db'
import { isZodError } from '@/utils/functions/common'

export default function PetTypeQuestion() {
  const { isFirstQuestion, nextStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetPetType = (petType: PetType) => {
    setSurveyData((data) => ({ ...data, petType }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyPetType.parse(surveyData.petType)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">Select your pet type</p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-2">
        {Object.values(PetType).map((type) => (
          <OptionCard
            key={type}
            label={type}
            isSelected={surveyData.petType === type}
            onClick={() => handleSetPetType(type)}
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onNext={handleNext} hideBackButton={isFirstQuestion} />
    </>
  )
}
