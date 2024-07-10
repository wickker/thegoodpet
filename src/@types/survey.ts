import { z } from 'zod'
import { Gender, PetType } from '@/utils/constants/db'

export const SurveyPetType = z.nativeEnum(PetType)
export const SurveyGender = z.nativeEnum(Gender)
export const SurveyPetName = z.string()

export const SurveySchema = z.object({
  petType: SurveyPetType,
  gender: SurveyGender,
  name: SurveyPetName,
})
