'use client'

import { ChangeEvent, useContext, useState } from 'react'
import { SurveyEmail } from '@/@types/survey'
import { Button, FormErrorMessage } from '@/components/common'
import { SurveyFooter } from '@/components/Survey'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { isZodError } from '@/utils/functions/common'

export default function EmailMarketingQuestion() {
  const { prevStep, surveyData, setSurveyData } = useContext(SurveyContext)
  const [errorDisplay, setErrorDisplay] = useState<string>('')

  const handleSetName = (e: ChangeEvent<HTMLInputElement>) => {
    setSurveyData((data) => ({ ...data, email: e.target.value }))
    setErrorDisplay('')
  }

  const handleNext = () => {
    try {
      SurveyEmail.parse(surveyData.email)
      console.log(surveyData)
      // TODO: server action
    } catch (e) {
      if (!isZodError(e)) return
      setErrorDisplay(e.issues[0]?.message)
    }
  }

  const SubmitButton = (
    <form className="w-full md:w-32">
      <Button width="w-full" onClick={undefined}>
        Submit
      </Button>
    </form>
  )

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
      </div>

      <SurveyFooter
        onBack={prevStep}
        onNext={handleNext}
        customNextButton={SubmitButton}
      />
    </>
  )
}
