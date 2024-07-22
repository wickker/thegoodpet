'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyWeightGrams } from '@/@types/survey'
import { FormErrorMessage, SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function WeightQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetWeight = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({
      ...data,
      weight: (parseFloat(e.target.value) || 0) * 1000,
    }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyWeightGrams.parse(surveyData.weight)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }
  return (
    <>
      <p className="my-5 text-center font-inter">
        How heavy is {capitalize(surveyData.name || '')}?
      </p>

      <div className="mx-auto flex w-full max-w-[360px] justify-center gap-4">
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            className="block w-16 rounded-lg border px-3 py-2 outline-secondary"
            value={(surveyData.weight || 0) / 1000}
            min={0}
            step="0.1"
            onChange={handleSetWeight}
          />
          <div>KG</div>
        </div>
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
