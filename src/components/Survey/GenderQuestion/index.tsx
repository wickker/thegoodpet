import { PropsWithChildren, useContext } from 'react'
import SurveyFooter from '@/components/Survey/SurveyFooter'
import { SurveyContext } from '@/contexts/SurveyProvider'

export default function GenderQuestion({ children }: PropsWithChildren) {
  const { prevStep, nextStep } = useContext(SurveyContext)
  return (
    <div>
      Gender
      {children}
      <SurveyFooter onBack={prevStep} onNext={nextStep} />
    </div>
  )
}
