'use client'

import { ChangeEvent, SetStateAction, useContext, useState } from 'react'
import { DateTime } from 'luxon'
import { SurveyDOB } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { capitalize, isZodError } from '@/utils/functions/common'

export default function AgeQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [age, setAge] = useState({
    year: 0,
    month: 0,
  })
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetAge = (
    value: SetStateAction<{
      year: number
      month: number
    }>,
  ) => {
    setAge(value)
    setErrorDisplay('')
  }

  const setYear = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetAge((a) => ({ ...a, year: parseInt(e.target.value) || 0 }))

  const setMonth = (e: ChangeEvent<HTMLInputElement>) =>
    handleSetAge((a) => ({
      ...a,
      month: Math.min(parseInt(e.target.value) | 0, 12),
    }))

  const handleNext = () => {
    try {
      const dob = DateTime.now().minus({ months: age.month, years: age.year })
      SurveyDOB.parse(dob.toJSDate())
      setSurveyData((survey) => ({ ...survey, dob: dob.toJSDate() }))
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
            value={age.year}
            min={0}
            onChange={setYear}
          />
          <p>Years</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="block w-16 rounded-lg border px-3 py-2 outline-secondary"
            value={age.month}
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
