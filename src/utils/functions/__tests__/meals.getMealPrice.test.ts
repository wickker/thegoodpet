import { describe, test, expect } from 'vitest'
import { Ingredient, Species } from '@/utils/constants/db'
import { getMealPrice } from '@/utils/functions/meal'

// TODO: Nic to add more testcases

const testCases = [
  {
    testName: 'should calculate price of chicken(240g) for cats',
    species: Species.CAT,
    volumeGrams: 240,
    ingredient: Ingredient.CHICKEN,
    expected: 5.69,
  },
  {
    testName: 'should calculate price of beef(235g) for cats',
    species: Species.CAT,
    volumeGrams: 235,
    ingredient: Ingredient.BEEF,
    expected: 6.18,
  },
]

describe.each(testCases)(
  'getMealPrice',
  ({ testName, species, volumeGrams, ingredient, expected }) => {
    test(testName, () => {
      expect(getMealPrice(species, volumeGrams, ingredient)).toBe(expected)
    })
  },
)
