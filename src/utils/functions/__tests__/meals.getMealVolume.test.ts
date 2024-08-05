import { describe, test, expect } from 'vitest'
import { Ingredient, Species } from '@/utils/constants/db'
import { getMealVolume } from '@/utils/functions/meal'

// TODO: Nic to add more testcases

const testCases = [
  {
    testName: 'should calculate chicken meal volume for cats',
    species: Species.CAT,
    DER: 298.0127589185465,
    ingredient: Ingredient.CHICKEN,
    expected: 240,
  },
]

describe.each(testCases)(
  'getMealVolume',
  ({ testName, species, DER, ingredient, expected }) => {
    test(testName, () => {
      expect(getMealVolume(species, DER, ingredient)).toBe(expected)
    })
  },
)
