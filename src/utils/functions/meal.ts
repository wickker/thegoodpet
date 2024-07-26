import { PetType } from '@/utils/constants/db'

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
  petType: PetType,
  ageMonth: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
) => {
  // Calculate Resting Energy Requirements (RER)
  const RER = 70 * Math.pow(weightGram / 1000, 0.75)

  // Get the appropriate ratio
  const isDog = petType === PetType.DOG
  const ratio = isDog
    ? getDogActivityRatio(ageMonth, isNeutered, weightGoal, activityLevel)
    : getCatActivityRatio(ageMonth, isNeutered, weightGoal, activityLevel)

  // Calculate Daily Energy Requirements (DER)
  const DER = RER * ratio

  // Calculate Conversion Variable and Daily Food Volume Estimate
  const conversionVariable = DER / 1000
  const dailyFoodVolumeEstimate = conversionVariable * 538

  return {
    RER,
    DER,
    conversionVariable,
    dailyFoodVolumeEstimate,
  }
}
