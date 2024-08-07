'use client'

import { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { SurveyData } from '@/@types/survey'
import {
  ActivityLevelQuestion,
  AgeQuestion,
  AllergicIngredientsQuestion,
  BreedQuestion,
  BuildYourBoxQuestion,
  // FoodGoalDetails,   TODO: skip question for now
  // FoodGoalQuestion,  TODO: skip question for now
  GenderQuestion,
  MealDonenessQuestion,
  NameQuestion,
  NeuteredQuestion,
  OmitIngredientsQuestion,
  SpeciesQuestion,
  WeightGoalQuestion,
  WeightQuestion,
} from '@/components/Survey'

type SurveyContextSchema = {
  currentStep: number
  clearLocalStorageSurveyData: () => void
  isFirstQuestion: boolean
  isLastQuestion: boolean
  nextStep: () => void
  prevStep: () => void
  surveyComponents: Array<(props: PropsWithChildren) => JSX.Element>
  surveyData: Partial<SurveyData>
  setSurveyData: (data: Partial<SurveyData>) => void
}

export const SurveyContext = createContext<SurveyContextSchema>({
  currentStep: 0,
  clearLocalStorageSurveyData: () => {},
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
  const [surveyData, _setSurveyData] = useState<Partial<SurveyData>>({})
  const surveyComponents = [
    SpeciesQuestion,
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
    BuildYourBoxQuestion,
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

  const setSurveyData = (data: Partial<SurveyData>) => {
    _setSurveyData(data)
    localStorage.setItem('the-good-pet-survey', JSON.stringify(data))
  }

  const clearLocalStorageSurveyData = () =>
    localStorage.removeItem('the-good-pet-survey')

  function getInitialSurveyData(): Partial<SurveyData> {
    const defaultValue: Partial<SurveyData> = {
      ageYear: 0,
      ageMonth: 0,
      activityLevel: 3,
    }

    const existingSurveyStr = localStorage.getItem('the-good-pet-survey')

    if (!existingSurveyStr) {
      return defaultValue
    }

    try {
      const existingSurvey = JSON.parse(existingSurveyStr)
      return existingSurvey
    } catch (e) {
      return defaultValue
    }
  }

  // Side effects
  useEffect(() => {
    const step = parseInt(searchParams.get('step') || '0')
    setCurrentStep(step)
  }, [searchParams])

  useEffect(() => setSurveyData(getInitialSurveyData()), [])

  return (
    <SurveyContext.Provider
      value={{
        currentStep,
        clearLocalStorageSurveyData,
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
