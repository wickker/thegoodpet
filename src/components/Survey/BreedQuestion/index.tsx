'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyBreed } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import BreedDropdown from '@/components/Survey/BreedQuestion/BreedDropdown'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Gender } from '@/utils/constants/db'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function BreedQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [isUnknownBreed, setIsUnknownBreed] = useState<boolean>(
    surveyData.breed === 'Unknown',
  )
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetBreed = (e: ChangeEvent<HTMLSelectElement>) => {
    setSurveyData({ ...surveyData, breed: e.target.value })
    setErrorDisplay('')
  }

  const handleSetUnknown = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorDisplay('')
    const isChecked = e.target.checked
    setIsUnknownBreed(isChecked)
    if (isChecked) {
      setSurveyData({ ...surveyData, breed: 'Unknown' })
      return
    }
    setSurveyData({ ...surveyData, breed: '' })
  }

  const handleNext = () => {
    try {
      SurveyBreed.parse(surveyData.breed)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }
  return (
    <>
      <p className="my-5 text-center font-inter">
        What breed is {capitalize(surveyData.name || '')}?
      </p>

      <div className="mx-auto w-full max-w-[360px]">
        <BreedDropdown
          species={surveyData.species}
          onChange={handleSetBreed}
          disabled={isUnknownBreed}
          value={surveyData.breed}
        />

        <label className="mt-2 flex justify-center gap-2">
          <input
            type="checkbox"
            checked={isUnknownBreed}
            onChange={handleSetUnknown}
          />
          I don't know {surveyData.gender === Gender.MALE ? 'his' : 'her'} breed
        </label>
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
