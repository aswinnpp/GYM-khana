import mongoose from 'mongoose';

const dailyStatusSchema = new mongoose.Schema({
  proteinConsumed: { type: Number, default: 0 }, // grams
  carbsConsumed: { type: Number, default: 0 },   // grams
  fatsConsumed: { type: Number, default: 0 },    // grams (healthy fats)
  electrolytesConsumed: { type: Number, default: 0 }, // mg
  waterConsumed: { type: Number, default: 0 }    // ml
}, { timestamps: true });

const DailyStatus = mongoose.model('DailyStatus', dailyStatusSchema);
export default DailyStatus;
