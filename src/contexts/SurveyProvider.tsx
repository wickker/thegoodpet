'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { SurveyData } from '@/@types/survey'
import {
  ActivityLevelQuestion,
  AgeQuestion,
  AllergicIngredientsQuestion,
  BreedQuestion,
  // FoodGoalDetails,   TODO: skip question for now
  // FoodGoalQuestion,  TODO: skip question for now
  GenderQuestion,
  MealDonenessQuestion,
  NameQuestion,
  NeuteredQuestion,
  OmitIngredientsQuestion,
  PetTypeQuestion,
  WeightGoalQuestion,
  WeightQuestion,
} from '@/components/Survey'

type SurveyContextSchema = {
  currentStep: number
  isFirstQuestion: boolean
  isLastQuestion: boolean
  nextStep: () => void
  prevStep: () => void
  surveyComponents: Array<(props: PropsWithChildren) => JSX.Element>
  surveyData: Partial<SurveyData>
  setSurveyData: Dispatch<SetStateAction<Partial<SurveyData>>>
}

export const SurveyContext = createContext<SurveyContextSchema>({
  currentStep: 0,
  isFirstQuestion: true,
  isLastQuestion: false,
  nextStep: () => {},
  prevStep: () => {},
  surveyComponents: [],
  surveyData: {},
  setSurveyData: () => {},
})

export default function SurveyProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const parsedStep = parseInt(searchParams.get('step') || '0')
  const [currentStep, setCurrentStep] = useState<number>(parsedStep)
  const [surveyData, setSurveyData] = useState<Partial<SurveyData>>({
    activityLevel: 3,
  })
  const surveyComponents = [
    PetTypeQuestion,
    GenderQuestion,
    NameQuestion,
    AgeQuestion,
    NeuteredQuestion,
    BreedQuestion,
    WeightQuestion,
    WeightGoalQuestion,
    ActivityLevelQuestion,
    // FoodGoalQuestion,
    // FoodGoalDetails,
    AllergicIngredientsQuestion,
    OmitIngredientsQuestion,
    MealDonenessQuestion,
  ]

  // Derived state
  const isFirstQuestion = currentStep === 0
  const isLastQuestion = currentStep === surveyComponents.length - 1

  // Functions
  const nextStep = () => {
    const nextStep = Math.min(currentStep + 1, surveyComponents.length - 1)
    router.push(pathname + `?step=${nextStep}`)
  }

  const prevStep = () => {
    const prevStep = Math.max(currentStep - 1, 0)
    router.push(pathname + `?step=${prevStep}`)
  }

  // Side effects
  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '0')
    setCurrentStep(step)
  }, [searchParams])

  // TODO: Save survey data to local storage on data change
  // TODO: Populate survey data state from local storage onMount

  return (
    <SurveyContext.Provider
      value={{
        currentStep,
        isFirstQuestion,
        isLastQuestion,
        nextStep,
        prevStep,
        surveyComponents,
        surveyData,
        setSurveyData,
      }}
    >
      {children}
    </SurveyContext.Provider>
  )
}
