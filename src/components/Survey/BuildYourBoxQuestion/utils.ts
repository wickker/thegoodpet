import { MeatTypeToQuantity } from '@/@types/survey'
import { Ingredient } from '@/utils/constants/db'

export const getDefaultNumberPacksPerMeat = (
  ingredientsToPack: Array<Ingredient>,
) => {
  const numIngredientsToPack = ingredientsToPack.length
  const defaultNum = Math.floor(14 / numIngredientsToPack)
  const defaultPacksPerMeatMap: Partial<MeatTypeToQuantity> = {}

  for (let i = 0; i < numIngredientsToPack; i++) {
    const ingredient = ingredientsToPack[i]

    if (i === numIngredientsToPack - 1) {
      defaultPacksPerMeatMap[ingredient] =
        14 - defaultNum * (numIngredientsToPack - 1)
      continue
    }
    defaultPacksPerMeatMap[ingredient] = defaultNum
  }

  return defaultPacksPerMeatMap
}
