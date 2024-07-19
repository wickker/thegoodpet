import { z } from 'zod'
import { Gender, PetType } from '@/utils/constants/db'

export const SurveyPetType = z.nativeEnum(PetType, {
  message: 'Pet type is required',
})
export const SurveyGender = z.nativeEnum(Gender, {
  message: 'Gender is required',
})
export const SurveyPetName = z.string().min(1)

export const SurveyDataSchema = z.object({
  petType: SurveyPetType,
  gender: SurveyGender,
  name: SurveyPetName,
})

export type SurveyData = z.infer<typeof SurveyDataSchema>
