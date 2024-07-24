'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyEmail, SurveyAcceptsMarketing } from '@/@types/survey'
import { FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { isZodError } from '@/utils/functions/common'

export default function EmailMarketingQuestion() {
  const { nextStep, prevStep, surveyData, setSurveyData } =
    useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({ ...data, email: e.target.value }))
    setErrorDisplay('')
  }

  const handleSetMarketing = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({
      ...data,
      acceptsMarketing: e.target.value === 'true',
    }))
  }

  const handleNext = () => {
    try {
      SurveyEmail.parse(surveyData.email)
      SurveyAcceptsMarketing.parse(surveyData.acceptsMarketing)
      console.log(surveyData)
      nextStep()
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">What's your email?</p>

      <div className="mx-auto w-full max-w-[360px]">
        <input
          type="text"
          onChange={handleSetName}
          defaultValue={surveyData.email}
          className="block w-full rounded-lg border px-3 py-2 outline-secondary"
        />
        <FormErrorMessage message={errorDisplay} />

        <p className="text-justify text-sm">
          We'd love to send you free samples, new product updates and news from
          us and our partners. Sounds good?
        </p>
        <div className="flex justify-around">
          {[true, false].map((v) => (
            <label className="flex gap-2" key={v.toString()}>
              <input
                type="radio"
                name="accept_marketing"
                value={v.toString()}
                defaultChecked={v === surveyData.acceptsMarketing}
                onChange={handleSetMarketing}
              />
              {v ? 'Yes' : 'No'}
            </label>
          ))}
        </div>
      </div>

      <SurveyFooter onBack={prevStep} onNext={handleNext} />
    </>
  )
}
