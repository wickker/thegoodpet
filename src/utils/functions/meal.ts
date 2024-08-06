import { MeatTypeToQuantity } from '@/@types/survey'
import { Ingredient, Species } from '@/utils/constants/db'
import { capitalize } from '@/utils/functions/common'

const SPECIES_TO_INGREDIENT_DETAILS = {
  [Species.DOG]: {
    [Ingredient.CHICKEN]: { calPerGram: 1.16, centPerGram: 2.37 },
    [Ingredient.BEEF]: { calPerGram: 1.19, centPerGram: 2.63 },
    [Ingredient.DUCK]: { calPerGram: 1.2, centPerGram: 2.81 },
    [Ingredient.LAMB]: { calPerGram: 1.2, centPerGram: 2.81 },
  },
  [Species.CAT]: {
    [Ingredient.CHICKEN]: { calPerGram: 1.24, centPerGram: 2.37 },
    [Ingredient.BEEF]: { calPerGram: 1.27, centPerGram: 2.63 },
    [Ingredient.DUCK]: { calPerGram: 1.2, centPerGram: 2.81 },
    [Ingredient.LAMB]: { calPerGram: 1.2, centPerGram: 2.81 },
  },
}

// Define activity ratios for dogs based on age, neutered status, and activity
export const getDogActivityRatio = (
  ageMonth: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
): number => {
  if (ageMonth < 4) {
    return 3.0
  }

  if (ageMonth < 18) {
    return 2.0
  }

  if (activityLevel < 3 || weightGoal < 3) {
    return 1.2
  }

  if (weightGoal > 3) {
    return 1.8
  }

  return isNeutered ? 1.6 : 1.8
}

// Define activity ratios for cats based on age, neutered status, and activity
export const getCatActivityRatio = (
  ageMonth: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
): number => {
  if (ageMonth < 12) {
    return 2.5
  }

  if (activityLevel < 3 || weightGoal < 3) {
    return 1.0
  }

  if (weightGoal > 3) {
    return 1.6
  }

  return isNeutered ? 1.2 : 1.4
}

export const getMealMetrics = (
  weightGram: number,
  species: Species,
  ageMonth: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
) => {
  // Calculate Resting Energy Requirements (RER)
  const RER = 70 * Math.pow(weightGram / 1000, 0.75)

  // Get the appropriate ratio
  const isDog = species === Species.DOG
  const ratio = isDog
    ? getDogActivityRatio(ageMonth, isNeutered, weightGoal, activityLevel)
    : getCatActivityRatio(ageMonth, isNeutered, weightGoal, activityLevel)

  // Calculate Daily Energy Requirements (DER)
  const DER = RER * ratio

  return {
    RER,
    DER,
  }
}

// Calculate the volume of a single meal based on a pet's species, DER and the meal's ingredient
export const getMealVolume = (
  species: Species,
  DER: number,
  ingredient: Ingredient,
) => {
  const ingredientDetail = SPECIES_TO_INGREDIENT_DETAILS[species][ingredient]
  return Math.round(DER / ingredientDetail.calPerGram)
}

// Calculate the price of a single meal based on a pet's species, meal's ingredient and volume
export const getMealPrice = (
  species: Species,
  foodVolumeGrams: number,
  ingredient: Ingredient,
) => {
  const ingredientDetail = SPECIES_TO_INGREDIENT_DETAILS[species][ingredient]
  return parseFloat(
    ((foodVolumeGrams * ingredientDetail.centPerGram) / 100).toFixed(2),
  )
}

export const generateMealProduct = (
  species: Species,
  DER: number,
  meatTypeToQuantity: MeatTypeToQuantity,
): { description: string; price: number } => {
  const mealDescriptions = []
  let price = 0

  for (const ingredient in meatTypeToQuantity) {
    const qty = meatTypeToQuantity[ingredient as Ingredient] || 0
    const foodVolumeGrams = getMealVolume(
      species,
      DER,
      ingredient as Ingredient,
    )
    const ingredientMealPrice = getMealPrice(
      species,
      foodVolumeGrams,
      ingredient as Ingredient,
    )

    mealDescriptions.push(
      `${foodVolumeGrams} grams of ${capitalize(ingredient)}, ${qty} packs`,
    )
    price += ingredientMealPrice * qty
  }

  return { description: mealDescriptions.join(' | '), price }
}
