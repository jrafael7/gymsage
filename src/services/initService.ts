import { initDatabase } from '../database/schema';
import { DEFAULT_EXERCISES } from '../constants/exercises';
import { DEFAULT_PLANS } from '../constants/plans';

export const initializeDatabase = async (): Promise<void> => {
  const db = await initDatabase();

  // Verificar se já existem exercícios
  const exerciseCount = await db.count('exercises');

  if (exerciseCount === 0) {
    // Popular exercícios base
    for (const exercise of DEFAULT_EXERCISES) {
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
        is_custom: 0,
        created_at: new Date().toISOString(),
      });
    }
  }

  // Verificar se já existem planos
  const planCount = await db.count('workout_plans');

  if (planCount === 0) {
    // Popular planos base
    for (const plan of DEFAULT_PLANS) {
      await db.put('workout_plans', {
        id: plan.id,
        name: plan.name,
        frequency: plan.frequency,
        is_custom: 0,
        created_at: new Date().toISOString(),
      });

      for (const division of plan.divisions) {
        await db.put('plan_divisions', {
          id: division.id,
          plan_id: plan.id,
          name: division.name,
          day_index: division.dayIndex,
          exercises: JSON.stringify(division.exercises),
        });
      }
    }
  }

  // Verificar se já existe perfil de utilizador
  const profileCount = await db.count('user_profile');

  if (profileCount === 0) {
    await db.put('user_profile', {
      id: 'user-001',
      age: 51,
      weight: 75,
      height: 175,
      goals: JSON.stringify(['mobilidade', 'longevidade', 'postura', 'equilíbrio']),
      restrictions: JSON.stringify(['lombar_frágil']),
      preferred_rest_seconds: 90,
      enable_vibration: 1,
      enable_sound: 0,
      units: 'metric',
    });
  }
};