'use client'
import { useContext } from 'react'
import SurveyFooter from '@/components/Survey/SurveyFooter'
import { SurveyContext } from '@/contexts/SurveyProvider'

export default function Gender() {
  const { prevStep, nextStep } = useContext(SurveyContext)
  return (
    <div>
      Gender
      <SurveyFooter onBack={prevStep} onNext={nextStep} />
    </div>
  )
}
