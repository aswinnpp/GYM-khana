import Profile from '../models/profileModel.js';
import DailyStatus from '../models/dailyStatusModel.js';

const homeSetup = async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) {
            return res.status(400).json({ error: 'user is required' });
        }

        const profile = await Profile.findOne({ user });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        const status = await DailyStatus.findOne({});

        return res.status(200).json({
            profile: {
                weight: profile.weight,
                height: profile.height,
                age: profile.age,
                gender: profile.gender,
                activity: profile.activity,
                goal: profile.goal,
            },
            macros: {
                protein: profile.protein,
                carbs: profile.carbs,
                fats: profile.fats,
                electrolytes: profile.electrolytes,
                water: profile.water,
            },
            dailyTotals: {
                proteinConsumed: status?.proteinConsumed ?? 0,
                carbsConsumed: status?.carbsConsumed ?? 0,
                fatsConsumed: status?.fatsConsumed ?? 0,
                electrolytesConsumed: status?.electrolytesConsumed ?? 0,
                waterConsumed: status?.waterConsumed ?? 0,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default homeSetup;