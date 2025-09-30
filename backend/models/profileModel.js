import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  activity: { type: String, enum: ['sedentary', 'light', 'moderate', 'active', 'very_active'], required: true },
  goal: { type: String, enum: ['lose', 'maintain', 'gain'], required: true },
  protein: { type: Number, required: true },         // grams
  carbs: { type: Number, required: true },           // grams
  fats: { type: Number, required: true },            // grams (healthy fats)
  electrolytes: { type: Number, required: true },    // mg
  water: { type: Number, required: true }            // ml
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
