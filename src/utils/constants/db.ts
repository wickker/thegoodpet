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
