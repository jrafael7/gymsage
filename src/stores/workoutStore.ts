import { create } from 'zustand';
import { WorkoutSession, WorkoutSet, DivisionName } from '../models/types';
import { initDatabase } from '../database/schema';

interface WorkoutStore {
  activeSession: WorkoutSession | null;
  isActive: boolean;
  startWorkout: (division: DivisionName, planId: string) => Promise<void>;
  completeSet: (setId: string, reps: number, weight: number, restSeconds: number) => Promise<void>;
  addSet: (exerciseId: string, setNumber: number, reps: number, weight: number, restSeconds: number) => Promise<void>;
  endWorkout: (notes: string, feeling: number, lumbarComplaint: boolean) => Promise<void>;
  getSessions: () => Promise<WorkoutSession[]>;
  getSessionById: (id: string) => Promise<WorkoutSession | null>;
  getLastSession: () => Promise<WorkoutSession | null>;
  getSessionsByDivision: (division: DivisionName) => Promise<WorkoutSession[]>;
  getLumbarComplaintHistory: () => Promise<WorkoutSession[]>;
  getWeeklyFrequency: () => Promise<number>;
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  activeSession: null,
  isActive: false,

  startWorkout: async (division, planId) => {
    const session: WorkoutSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      planId,
      division,
      duration: 0,
      notes: '',
      lumbarComplaint: false,
      feeling: 3,
      sets: [],
      completed: false,
    };

    const db = await initDatabase();
    await db.put('workout_sessions', {
      id: session.id,
      date: session.date,
      plan_id: session.planId,
      division: session.division,
      duration: 0,
      notes: '',
      lumbar_complaint: 0,
      feeling: 3,
      completed: 0,
    });

    set({ activeSession: session, isActive: true });
  },

  addSet: async (exerciseId, setNumber, reps, weight, restSeconds) => {
    const session = get().activeSession;
    if (!session) return;

    const setId = `set-${Date.now()}-${setNumber}`;
    const db = await initDatabase();
    await db.put('workout_sets', {
      id: setId,
      session_id: session.id,
      exercise_id: exerciseId,
      set_number: setNumber,
      reps,
      weight,
      rest_seconds: restSeconds,
      completed: 0,
      notes: '',
    });
  },

  completeSet: async (setId, reps, weight, restSeconds) => {
    const db = await initDatabase();
    const existing = await db.get('workout_sets', setId);
    if (existing) {
      await db.put('workout_sets', { ...existing, reps, weight, rest_seconds: restSeconds, completed: 1 });
    }
  },

  endWorkout: async (notes, feeling, lumbarComplaint) => {
    const session = get().activeSession;
    if (!session) return;

    const db = await initDatabase();
    const now = new Date();
    const startDate = new Date(session.date);
    const duration = Math.floor((now.getTime() - startDate.getTime()) / 1000);

    const existing = await db.get('workout_sessions', session.id);
    if (existing) {
      await db.put('workout_sessions', {
        ...existing,
        duration,
        notes,
        lumbar_complaint: lumbarComplaint ? 1 : 0,
        feeling,
        completed: 1,
      });
    }

    set({ activeSession: null, isActive: false });
  },

  getSessions: async () => {
    const db = await initDatabase();
    const all = await db.getAll('workout_sessions');
    return all.map(mapSessionRow).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getSessionById: async (id) => {
    const db = await initDatabase();
    const row = await db.get('workout_sessions', id);
    return row ? mapSessionRow(row) : null;
  },

  getLastSession: async () => {
    const db = await initDatabase();
    const all = await db.getAll('workout_sessions');
    if (all.length === 0) return null;
    return all.map(mapSessionRow).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  },

  getSessionsByDivision: async (division) => {
    const db = await initDatabase();
    const all = await db.getAll('workout_sessions');
    return all.map(mapSessionRow).filter((s) => s.division === division).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getLumbarComplaintHistory: async () => {
    const db = await initDatabase();
    const all = await db.getAll('workout_sessions');
    return all.map(mapSessionRow).filter((s) => s.lumbarComplaint).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },

  getWeeklyFrequency: async () => {
    const db = await initDatabase();
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const all = await db.getAll('workout_sessions');
    return all.filter((s: any) => new Date(s.date) >= sevenDaysAgo && s.completed === 1).length;
  },
}));

function mapSessionRow(row: any): WorkoutSession {
  return {
    id: row.id,
    date: row.date,
    planId: row.plan_id,
    division: row.division as DivisionName,
    duration: row.duration || 0,
    notes: row.notes || '',
    lumbarComplaint: row.lumbar_complaint === 1 || row.lumbar_complaint === true,
    feeling: row.feeling || 3,
    sets: [],
    completed: row.completed === 1 || row.completed === true,
  };
}
