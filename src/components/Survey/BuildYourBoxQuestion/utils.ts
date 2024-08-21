import { MeatTypeToQuantity } from '@/@types/survey'
import { Ingredient } from '@/utils/constants/db'

export const getDefaultNumberPacksPerMeat = (
  ingredientsToPack: Array<Ingredient>,
) => {
  const numIngredients = ingredientsToPack.length
  const defaultPackNum = Math.floor(14 / numIngredients)
  const defaultPacksPerMeatMap: Partial<MeatTypeToQuantity> = {}

  for (let i = 0; i < numIngredients; i++) {
    const ingredient = ingredientsToPack[i]

    if (i === numIngredients - 1) {
      defaultPacksPerMeatMap[ingredient] =
        14 - defaultPackNum * (numIngredients - 1)
      continue
    }
    defaultPacksPerMeatMap[ingredient] = defaultPackNum
  }

  return defaultPacksPerMeatMap
}
