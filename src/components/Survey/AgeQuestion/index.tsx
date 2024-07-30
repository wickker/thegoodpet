'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { DateTime } from 'luxon'
import { SurveyDOB } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function AgeQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetAge = (value: { ageYear?: number; ageMonth?: number }) => {
    setSurveyData(value)
    setErrorDisplay('')
  }

  const setYear = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetAge({ ...surveyData, ageYear: parseInt(e.target.value) || 0 })

  const setMonth = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetAge({
      ...surveyData,
      ageMonth: Math.min(parseInt(e.target.value) | 0, 12),
    })

  const handleNext = () => {
    try {
      const dob = DateTime.now().minus({
        months: surveyData.ageMonth,
        years: surveyData.ageYear,
      })
      SurveyDOB.parse(dob.toJSDate())
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }
  return (
    <>
      <p className="my-5 text-center font-inter">
        How old is {capitalize(surveyData.name || '')}?
      </p>

      <div className="mx-auto flex w-full max-w-[360px] justify-center gap-4">
        <div className="flex items-center justify-end gap-2">
          <input
            type="number"
            className="block w-16 rounded-lg border px-3 py-2 outline-secondary"
            value={surveyData.ageYear}
            min={0}
            onChange={setYear}
          />
          <p>Years</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="block w-16 rounded-lg border px-3 py-2 outline-secondary"
            value={surveyData.ageMonth}
            min={0}
            max={12}
            onChange={setMonth}
          />
          <p>Months</p>
        </div>
      </div>

      <FormErrorMessage message={errorDisplay} />

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
