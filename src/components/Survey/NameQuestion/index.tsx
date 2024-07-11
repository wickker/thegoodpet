import { useContext } from 'react'
import SurveyFooter from '@/components/Survey/SurveyFooter'
import { SurveyContext } from '@/contexts/SurveyProvider'

export default function NameQuestion() {
  const { isLastQuestion, prevStep } = useContext(SurveyContext)
  return (
    <div>
      Name
      <SurveyFooter onBack={prevStep} hideNextButton={isLastQuestion} />
    </div>
  )
}