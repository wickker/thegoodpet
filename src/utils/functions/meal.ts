import { Species } from '@/utils/constants/db'

type Meat = {
  weight: number
  cost: number
}

type MeatDictionary = {
  [key: string]: Meat
}

// Calculates the weight and cost of each meat type based on the given DER (Daily Energy Requirement).
const calculateMealsGrams = (
  DER: number,
  meats: { [key: string]: { calPerGram: number; centPerGram: number } },
): MeatDictionary => {
  const meals: MeatDictionary = {}

  for (const [meat, values] of Object.entries(meats)) {
    const weight = Math.round(DER / values.calPerGram)
    const cost = parseFloat(((weight * values.centPerGram) / 100).toFixed(2))
    meals[meat] = { weight, cost }
  }

  return meals
}

// Gets the meal grams and cost for a given species (dog or cat) based on the DER.
export const getMealsGrams = (
  DER: number,
  species: Species,
): MeatDictionary => {
  const isDog = species === Species.DOG

  const dogMeats = {
    chicken: { calPerGram: 1.16, centPerGram: 2.37 },
    beef: { calPerGram: 1.19, centPerGram: 2.63 },
    duck: { calPerGram: 1.2, centPerGram: 2.81 },
    lamb: { calPerGram: 1.2, centPerGram: 2.81 },
  }

  const catMeats = {
    chicken: { calPerGram: 1.24, centPerGram: 2.37 },
    beef: { calPerGram: 1.27, centPerGram: 2.63 },
    duck: { calPerGram: 1.2, centPerGram: 2.81 },
    lamb: { calPerGram: 1.2, centPerGram: 2.81 },
  }

  const meals = isDog
    ? calculateMealsGrams(DER, dogMeats)
    : calculateMealsGrams(DER, catMeats)

  return meals
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
