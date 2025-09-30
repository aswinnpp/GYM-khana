import Profile from '../models/profileModel.js';

function calculateTargets(profile) {
  const weightKg = Number(profile.weight);

  // Protein (g/kg): higher for lose/gain goals
  let proteinPerKg = 1.6;
  if (profile.goal === 'lose') proteinPerKg = 2.0;
  if (profile.goal === 'gain') proteinPerKg = 1.8;
  const protein = Math.round(weightKg * proteinPerKg);

  // Carbs (g/kg): depends on activity
  let carbsPerKg = 3.0; // sedentary baseline
  switch (profile.activity) {
    case 'light': carbsPerKg = 3.5; break;
    case 'moderate': carbsPerKg = 4.0; break;
    case 'active': carbsPerKg = 4.5; break;
    case 'very_active': carbsPerKg = 5.0; break;
    default: carbsPerKg = 3.0; break;
  }
  const carbs = Math.round(weightKg * carbsPerKg);

  // Healthy fats (g/kg)
  const fats = Math.round(weightKg * 0.9);

  // Electrolytes (mg) - simple baseline
  const electrolytes = 1500;

  // Water (ml): 35 ml/kg baseline
  const water = Math.round(weightKg * 35);

  return { protein, carbs, fats, electrolytes, water };
}

const profileSetup = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("user",userId);
    
    const { weight, height, age, gender, activity, goal } = req.body;

    if (!userId || !weight || !height || !age || !gender || !activity || !goal) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const profileData = { weight: Number(weight), height: Number(height), age: Number(age), gender, activity, goal };
    const macros = calculateTargets(profileData);

    const profile = new Profile({
      user: userId,
      ...profileData,
      ...macros
    });

    await profile.save();

    return res.status(200).json({ message: 'Profile saved', profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default profileSetup;
