'use client'

import { useContext, useState } from 'react'
import { SurveySpecies } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { OptionCard, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { Species } from '@/utils/constants/db'
import { isZodError } from '@/utils/functions/common'

export default function SpeciesQuestion() {
  const { isFirstQuestion, nextStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetSpecies = (species: Species) => {
    setSurveyData((data) => ({ ...data, species }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveySpecies.parse(surveyData.species)
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
        {Object.values(Species).map((s) => (
          <OptionCard
            key={s}
            label={s}
            isSelected={surveyData.species === s}
            onClick={() => handleSetSpecies(s)}
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onNext={handleNext} hideBackButton={isFirstQuestion} />
    </>
  )
}
