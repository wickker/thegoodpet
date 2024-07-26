import { z } from 'zod'
import { Gender, Ingredient, MealDoneness, PetType } from '@/utils/constants/db'

export const SurveyPetType = z.nativeEnum(PetType, {
  message: 'Pet type is required',
})
export const SurveyGender = z.nativeEnum(Gender, {
  message: 'Gender is required',
})
export const SurveyPetName = z
  .string({ message: 'Pet name is required' })
  .min(1, { message: 'Pet name is required' })

export const SurveyAgeYear = z.number()

export const SurveyAgeMonth = z.number()

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

export const SurveyWeightGoal = z
  .number({ message: 'Pet weight goal is required' })
  .min(1, { message: 'Pet weight goal invalid' })
  .max(5, { message: 'Pet weight goal invalid' })

export const SurveyActivityLevel = z
  .number({ message: 'Pet activity level is required' })
  .min(1, { message: 'Pet activity level invalid' })
  .max(5, { message: 'Pet activity level invalid' })

export const SurveyFoodGoal = z
  .string({ message: 'Pet food goal is required' })
  .min(1, { message: 'Pet food goal is required' })

export const SurveyAllergicOmitIngredients = z.array(z.nativeEnum(Ingredient))

export const SurveyMealDoneness = z.nativeEnum(MealDoneness, {
  message: 'Meal doneness is required',
})

export const SurveyEmail = z.string({ message: 'Email is Required' }).email()

export const SurveyMeatTypeToQuantity = z.record(
  z.nativeEnum(Ingredient),
  z.number(),
)

export const SurveyDataSchema = z.object({
  petType: SurveyPetType,
  gender: SurveyGender,
  name: SurveyPetName,
  ageYear: SurveyAgeYear,
  ageMonth: SurveyAgeMonth,
  isNeutered: SurveyNeutered,
  breed: SurveyBreed,
  weight: SurveyWeightGrams,
  weightGoal: SurveyWeightGoal,
  activityLevel: SurveyActivityLevel,
  foodGoal: SurveyFoodGoal,
  allergicIngredients: SurveyAllergicOmitIngredients,
  omitIngredients: SurveyAllergicOmitIngredients,
  mealDoneness: SurveyMealDoneness,
  mealTypeToQuantity: SurveyMeatTypeToQuantity,
})

export type SurveyData = z.infer<typeof SurveyDataSchema>
