export const Gender = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export const Species = {
  CAT: 'CAT',
  DOG: 'DOG',
} as const

export type Species = (typeof Species)[keyof typeof Species]

export const WEIGHT_GOALS = [
  'Lose a lot of weight',
  'Lose a little weight',
  'Maintain weight',
  'Gain a little weight',
  'Gain a lot of weight',
]

export const FOOD_GOALS = [
  'Helps him manage his weight',
  'Has timely delivery',
  'Keeps him in good health',
  'Contains the proper ingredients',
  'Has a taste he loves',
  'Other',
]

export const Ingredient = {
  BEEF: 'BEEF',
  CHICKEN: 'CHICKEN',
  DUCK: 'DUCK',
  LAMB: 'LAMB',
} as const

export type Ingredient = (typeof Ingredient)[keyof typeof Ingredient]

export const MealDoneness = {
  RAW: 'RAW',
  GENTLY_COOKED: 'GENTLY COOKED',
} as const

export type MealDoneness = (typeof MealDoneness)[keyof typeof MealDoneness]
