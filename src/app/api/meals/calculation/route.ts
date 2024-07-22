import { NextResponse } from 'next/server';

// Define activity ratios for dogs based on age, neutered status, and activity
const getDogActivityRatio = (age: number, neutered: boolean, weightGoal: number, activity: number): number => {
  if (age < 4) {
    return 3.0;
  } else if (age < 18) {
    return 2.0;
  }

  if (activity < 3 || weightGoal < 3) {
    return 1.2;
  } else if (weightGoal > 3) {
    return 1.8;
  }

  return neutered ? 1.6 : 1.8;
};

// Define activity ratios for cats based on age, neutered status, and activity
const getCatActivityRatio = (age: number, neutered: boolean, weightGoal: number, activity: number): number => {
  if (age < 12) {
    return 2.5;
  }

  if (activity < 3 || weightGoal < 3) {
    return 1.0;
  } else if (weightGoal > 3) {
    return 1.6;
  }

  return neutered ? 1.2 : 1.4;
};

export async function POST(request: Request) {
  try {
    const { bodyWeight, species, age, neutered, weightGoal, activity } = await request.json();

    if (typeof bodyWeight !== 'number' || bodyWeight <= 0) {
      return NextResponse.json({ error: 'Invalid body weight' }, { status: 400 });
    }
    
    if (typeof age !== 'number' || age < 0) {
      return NextResponse.json({ error: 'Invalid age' }, { status: 400 });
    }

    if (typeof neutered !== 'boolean') {
      return NextResponse.json({ error: 'Neutered status must be a boolean' }, { status: 400 });
    }

    if (typeof weightGoal !== 'number' || weightGoal <= 0 || weightGoal > 5) {
        return NextResponse.json({ error: 'Invalid weight goal' }, { status: 400 });
    }

    if (typeof activity !== 'number' || activity <= 0 || activity > 5) {
        return NextResponse.json({ error: 'Invalid activity' }, { status: 400 });
    }

    if (!species) {
      return NextResponse.json({ error: 'Species are required' }, { status: 400 });
    }

    // Calculate Resting Energy Requirements (RER)
    const RER = 70 * Math.pow(bodyWeight, 0.75);

    // Get the appropriate ratio
    let ratio;
    if (species === 'dog') {
      ratio = getDogActivityRatio(age, neutered, weightGoal, activity);
    } else if (species === 'cat') {
      ratio = getCatActivityRatio(age, neutered, weightGoal, activity);
    } else {
      return NextResponse.json({ error: 'Invalid species' }, { status: 400 });
    }

    // Calculate Daily Energy Requirements (DER)
    const DER = RER * ratio;

    // Calculate Conversion Variable and Daily Food Volume Estimate
    const conversionVariable = DER / 1000;
    const dailyFoodVolumeEstimate = conversionVariable * 538;

    return NextResponse.json({ RER, DER, conversionVariable, dailyFoodVolumeEstimate });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate RER, DER, and Daily Food Volume Estimate' }, { status: 500 });
  }
}
