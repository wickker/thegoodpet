import { z } from 'zod'
import { Gender, PetType } from '@/utils/constants/db'

export const SurveyPetType = z.nativeEnum(PetType, {
  message: 'Pet type is required',
})
export const SurveyGender = z.nativeEnum(Gender, {
  message: 'Gender is required',
})
export const SurveyPetName = z
  .string({ message: 'Pet name is required' })
  .min(1, { message: 'Pet name is required' })

export const SurveyDOB = z
  .date()
  .max(new Date(), { message: 'Age is required' })

export const SurveyNeutered = z.boolean({
  message: 'Neutered status is required',
})

export const SurveyBreed = z
  .string({ message: 'Pet breed is required' })
  .min(1, { message: 'Pet breed is required' })

export const SurveyWeightGrams = z
  .number({ message: 'Pet weight is required' })
  .min(1, { message: 'Pet weight invalid' })

export const SurveyDataSchema = z.object({
  petType: SurveyPetType,
  gender: SurveyGender,
  name: SurveyPetName,
  dob: SurveyDOB,
  isNeutered: SurveyNeutered,
  breed: SurveyBreed,
  weight: SurveyWeightGrams,
})

export type SurveyData = z.infer<typeof SurveyDataSchema>
