'use client'

import { useContext, useState } from 'react'
import { SurveyNeutered } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { OptionCard, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function NeuteredQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetNeutered = (isNeutered: boolean) => {
    setSurveyData({ ...surveyData, isNeutered })
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyNeutered.parse(surveyData.isNeutered)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">
        Is {capitalize(surveyData.name || '')} Neutered?
      </p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-2">
        {[true, false].map((v) => (
          <OptionCard
            key={v.toString()}
            label={v ? 'Yes' : 'No'}
            isSelected={surveyData.isNeutered === v}
            onClick={() => handleSetNeutered(v)}
          />
        ))}
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
