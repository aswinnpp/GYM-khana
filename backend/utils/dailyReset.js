import cron from 'node-cron';
import DailyStatus from '../models/dailyStatusModel.js';

function getTodayMidnightLocal() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function scheduleDailyReset() {
  // Run at 00:00 local time every day
  cron.schedule('0 0 * * *', async () => {
    try {
      await DailyStatus.updateMany({}, {
        $set: {
          caloriesConsumed: 0,
          proteinConsumed: 0,
          carbsConsumed: 0,
          fatsConsumed: 0,
          updatedAt: new Date()
        }
      });
      console.log('[DailyReset] DailyStatus totals reset to zero at', getTodayMidnightLocal());
    } catch (err) {
      console.error('[DailyReset] Failed to reset DailyStatus:', err.message);
    }
  }, { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone });
}
