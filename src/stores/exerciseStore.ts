import { create } from 'zustand';
import { Exercise } from '../models/types';
import { initDatabase } from '../database/schema';

interface ExerciseStore {
  exercises: Exercise[];
  loading: boolean;
  loadExercises: () => Promise<void>;
  addExercise: (exercise: Exercise) => Promise<void>;
  updateExercise: (exercise: Exercise) => Promise<void>;
  deleteExercise: (id: string) => Promise<void>;
  getLumbarSafeExercises: () => Exercise[];
  getExercisesByMuscleGroup: (group: string) => Exercise[];
  getSubstitutions: (exerciseId: string) => Exercise[];
}

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: [],
  loading: false,

  loadExercises: async () => {
    set({ loading: true });
    try {
      const db = await initDatabase();
      const all = await db.getAll('exercises');
      const exercises: Exercise[] = all.map((row: any) => ({
        id: row.id,
        name: row.name,
        muscleGroup: row.muscle_group,
        image: row.image,
        description: row.description,
        isLumbarSafe: row.is_lumbar_safe === 1 || row.is_lumbar_safe === true,
        type: row.type,
        instructions: row.instructions,
        substitutions: JSON.parse(row.substitutions || '[]'),
        isCustom: row.is_custom === 1 || row.is_custom === true,
        createdAt: new Date(row.created_at),
      }));
      set({ exercises, loading: false });
    } catch (error) {
      console.error('Error loading exercises:', error);
      set({ loading: false });
    }
  },

  addExercise: async (exercise) => {
    try {
      const db = await initDatabase();
      await db.put('exercises', {
        id: exercise.id,
        name: exercise.name,
        muscle_group: exercise.muscleGroup,
        image: exercise.image || null,
        description: exercise.description,
        is_lumbar_safe: exercise.isLumbarSafe ? 1 : 0,
        type: exercise.type,
        instructions: exercise.instructions,
        substitutions: JSON.stringify(exercise.substitutions),
        is_custom: exercise.isCustom ? 1 : 0,
        created_at: exercise.createdAt.toISOString(),
      });
      await get().loadExercises();
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  },

  updateExercise: async (exercise) => {
    try {
      const db = await initDatabase();
      await db.put('exercises', {
        id: exercise.id,
        name: exercise.name,
        muscle_group: exercise.muscleGroup,
        image: exercise.image || null,
        description: exercise.description,
        is_lumbar_safe: exercise.isLumbarSafe ? 1 : 0,
        type: exercise.type,
        instructions: exercise.instructions,
        substitutions: JSON.stringify(exercise.substitutions),
        is_custom: exercise.isCustom ? 1 : 0,
        created_at: exercise.createdAt.toISOString(),
      });
      await get().loadExercises();
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  },

  deleteExercise: async (id) => {
    try {
      const db = await initDatabase();
      await db.delete('exercises', id);
      await get().loadExercises();
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  },

  getLumbarSafeExercises: () => {
    return get().exercises.filter((e) => e.isLumbarSafe);
  },

  getExercisesByMuscleGroup: (group) => {
    return get().exercises.filter((e) => e.muscleGroup === group);
  },

  getSubstitutions: (exerciseId) => {
    const exercise = get().exercises.find((e) => e.id === exerciseId);
    if (!exercise) return [];
    return get().exercises.filter((e) => exercise.substitutions.includes(e.id) && e.isLumbarSafe);
  },
}));
