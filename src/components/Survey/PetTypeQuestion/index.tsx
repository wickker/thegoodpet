'use client'
import { useContext } from 'react'
import { SurveyPetType } from '@/@types/survey'
import SurveyFooter from '@/components/Survey/SurveyFooter'
import { SurveyContext } from '@/contexts/SurveyProvider'
import { PetType } from '@/utils/constants/db'
import { capitalize, mc } from '@/utils/functions/common'

export default function PetTypeQuestion() {
  const { isFirstQuestion, nextStep, surveyData, setSurveyData } =
    useContext(SurveyContext)

  const handleSetPetType = (petType: PetType) =>
    setSurveyData((data) => ({ ...data, petType }))

  const handleNext = () => {
    try {
      SurveyPetType.parse(surveyData.petType)
      nextStep()
    } catch (e) {
      // TODO: handle proper error message
      console.log(e)
    }
  }

  return (
    <>
      <p className="my-5 text-center font-inter">Select your pet type</p>

      <div className="mx-auto grid w-full max-w-[360px] grid-cols-2">
        {Object.values(PetType).map((type) => (
          <button
            key={type}
            className={mc(
              'grid h-44 w-full max-w-36 items-center justify-center place-self-center rounded-lg bg-white transition-colors',
              'hover:bg-secondary hover:text-white',
              surveyData.petType === type && 'bg-secondary text-white',
            )}
            onClick={() => handleSetPetType(type)}
          >
            {capitalize(type)}
          </button>
        ))}
      </div>

      <SurveyFooter onNext={handleNext} hideBackButton={isFirstQuestion} />
    </>
  )
}
