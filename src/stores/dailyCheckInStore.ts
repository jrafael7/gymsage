import { create } from 'zustand';
import { DailyCheckIn } from '../models/types';
import { initDatabase } from '../database/schema';

interface DailyCheckInStore {
  todayCheckIn: DailyCheckIn | null;
  loading: boolean;
  loadTodayCheckIn: () => Promise<void>;
  saveCheckIn: (checkIn: DailyCheckIn) => Promise<void>;
  hasTodayCheckIn: () => boolean;
}

const getTodayISO = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const useDailyCheckInStore = create<DailyCheckInStore>((set, get) => ({
  todayCheckIn: null,
  loading: false,

  loadTodayCheckIn: async () => {
    set({ loading: true });
    try {
      const db = await initDatabase();
      const today = getTodayISO();
      const all = await db.getAll('daily_checkins');
      const todayEntry = all.find((c: any) => c.date === today);
      set({ todayCheckIn: todayEntry || null, loading: false });
    } catch (error) {
      console.error('Error loading daily check-in:', error);
      set({ loading: false });
    }
  },

  saveCheckIn: async (checkIn: DailyCheckIn) => {
    try {
      const db = await initDatabase();
      await db.put('daily_checkins', {
        id: checkIn.id,
        date: checkIn.date,
        energy_level: checkIn.energyLevel,
        squash_today: checkIn.squashToday,
        squash_tomorrow: checkIn.squashTomorrow,
        other_activity: checkIn.otherActivity,
        lumbar_status: checkIn.lumbarStatus,
        notes: checkIn.notes,
        created_at: checkIn.createdAt.toISOString(),
      });
      set({ todayCheckIn: checkIn });
    } catch (error) {
      console.error('Error saving daily check-in:', error);
    }
  },

  hasTodayCheckIn: () => {
    const { todayCheckIn } = get();
    if (!todayCheckIn) return false;
    return todayCheckIn.date === getTodayISO();
  },
}));
