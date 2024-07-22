// Define activity ratios for dogs based on age, neutered status, and activity
const getDogActivityRatio = (
  age: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
): number => {
  if (age < 4) {
    return 3.0
  } else if (age < 18) {
    return 2.0
  }

  if (activityLevel < 3 || weightGoal < 3) {
    return 1.2
  } else if (weightGoal > 3) {
    return 1.8
  }

  return isNeutered ? 1.6 : 1.8
}

// Define activity ratios for cats based on age, neutered status, and activity
const getCatActivityRatio = (
  age: number,
  isNeutered: boolean,
  weightGoal: number,
  activityLevel: number,
): number => {
  if (age < 12) {
    return 2.5
  }

  if (activityLevel < 3 || weightGoal < 3) {
    return 1.0
  } else if (weightGoal > 3) {
    return 1.6
  }

  return isNeutered ? 1.2 : 1.4
}

export async function POST(request: Request) {
  try {
    const { weightGram, petType, age, isNeutered, weightGoal, activityLevel } =
      await request.json()

    if (typeof weightGram !== 'number' || weightGram <= 0) {
      return Response.json({ error: 'Invalid body weight' }, { status: 400 })
    }

    if (typeof age !== 'number' || age < 0) {
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

    if (!petType) {
      return Response.json({ error: 'Species are required' }, { status: 400 })
    }

    // Calculate Resting Energy Requirements (RER)
    const RER = 70 * Math.pow(weightGram / 1000, 0.75)

    // Get the appropriate ratio
    let ratio
    if (petType === 'DOG') {
      ratio = getDogActivityRatio(age, isNeutered, weightGoal, activityLevel)
    } else if (petType === 'CAT') {
      ratio = getCatActivityRatio(age, isNeutered, weightGoal, activityLevel)
    } else {
      return Response.json({ error: 'Invalid species' }, { status: 400 })
    }

    // Calculate Daily Energy Requirements (DER)
    const DER = RER * ratio

    // Calculate Conversion Variable and Daily Food Volume Estimate
    const conversionVariable = DER / 1000
    const dailyFoodVolumeEstimate = conversionVariable * 538

    return Response.json({
      RER,
      DER,
      conversionVariable,
      dailyFoodVolumeEstimate,
    })
  } catch (error) {
    return Response.json(
      { error: 'Failed to calculate RER, DER, and Daily Food Volume Estimate' },
      { status: 500 },
    )
  }
}
