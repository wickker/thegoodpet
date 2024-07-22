'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyPetName } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Gender } from '@/utils/constants/db'
import { isZodError } from '@/utils/functions/common'

export default function NameQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const isFemale = surveyData.gender === Gender.FEMALE

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({ ...data, name: e.target.value }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyPetName.parse(surveyData.name)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }
  return (
    <>
      <p className="my-5 text-center font-inter">
        What is {isFemale ? 'her' : 'his'} name?
      </p>

      <div className="mx-auto w-full max-w-[360px]">
        <input
          type="text"
          onChange={handleSetName}
          className="block w-full rounded-lg border px-3 py-2 outline-secondary"
        />
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
