export const Gender = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
} as const

export type Gender = (typeof Gender)[keyof typeof Gender]

export const PetType = {
  CAT: 'CAT',
  DOG: 'DOG',
} as const

export type PetType = (typeof PetType)[keyof typeof PetType]

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
