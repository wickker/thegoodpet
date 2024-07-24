import { PetType } from '@/utils/constants/db'
import { getMealMetrics } from '@/utils/functions/meal'

export async function POST(request: Request) {
  try {
    const {
      weightGram,
      petType,
      ageMonth,
      isNeutered,
      weightGoal,
      activityLevel,
    } = await request.json()

    if (typeof weightGram !== 'number' || weightGram <= 0) {
      return Response.json({ error: 'Invalid body weight' }, { status: 400 })
    }

    if (typeof ageMonth !== 'number' || ageMonth < 0) {
      return Response.json({ error: 'Invalid age' }, { status: 400 })
    }

    if (typeof isNeutered !== 'boolean') {
      return Response.json(
        { error: 'Neutered status must be a boolean' },
        { status: 400 },
      )
    }

    if (typeof weightGoal !== 'number' || weightGoal <= 0 || weightGoal > 5) {
      return Response.json({ error: 'Invalid weight goal' }, { status: 400 })
    }

    if (
      typeof activityLevel !== 'number' ||
      activityLevel <= 0 ||
      activityLevel > 5
    ) {
      return Response.json({ error: 'Invalid activity' }, { status: 400 })
    }

    if (!petType || !Object.values(PetType).includes(petType)) {
      return Response.json({ error: 'Invalid pet type' }, { status: 400 })
    }

    const metrics = getMealMetrics(
      weightGram,
      petType,
      ageMonth,
      isNeutered,
      weightGoal,
      activityLevel,
    )

    return Response.json(metrics)
  } catch (error) {
    return Response.json(
      { error: 'Failed to calculate RER, DER, and Daily Food Volume Estimate' },
      { status: 500 },
    )
  }
}
