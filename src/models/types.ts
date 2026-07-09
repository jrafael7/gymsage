export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  image?: string;
  description: string;
  isLumbarSafe: boolean;
  type: ExerciseType;
  instructions: string;
  substitutions: string[];
  isCustom: boolean;
  createdAt: Date;
}

export type MuscleGroup = 
  | 'pernas' 
  | 'costas' 
  | 'peito' 
  | 'ombros' 
  | 'braços' 
  | 'core' 
  | 'mobilidade' 
  | 'equilíbrio';

export type ExerciseType = 'máquina' | 'peso livre' | 'bodyweight' | 'cardio';

export interface WorkoutPlan {
  id: string;
  name: string;
  frequency: number; // 2-6 vezes por semana
  divisions: PlanDivision[];
  isCustom: boolean;
  createdAt: Date;
}

export interface PlanDivision {
  id: string;
  name: DivisionName;
  dayIndex: number; // 0-6 (segunda=0, domingo=6)
  exercises: string[]; // exercise IDs
}

export type DivisionName = 
  | 'pernas' 
  | 'costas' 
  | 'peito' 
  | 'braços' 
  | 'full-body' 
  | 'mobilidade/recuperação' 
  | 'core/lombar';

export interface WorkoutSession {
  id: string;
  date: string; // ISO string
  planId: string;
  division: DivisionName;
  duration: number; // segundos
  notes: string;
  lumbarComplaint: boolean;
  feeling: number; // 1-5 (1=terrível, 5=excelente)
  sets: WorkoutSet[];
  completed: boolean;
}

export interface WorkoutSet {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weight: number;
  restSeconds: number;
  completed: boolean;
  notes: string;
}

export interface DaFitMetric {
  id: string;
  date: string;
  type: MetricType;
  value: number;
  sessionId?: string;
}

export type MetricType = 'fc_repouso' | 'fc_média_treino' | 'sono' | 'passos' | 'recuperação';

export interface UserProfile {
  id: string;
  age: number;
  weight: number;
  height: number;
  goals: string[];
  restrictions: string[];
  preferredRestSeconds: number;
  enableVibration: boolean;
  enableSound: boolean;
  units: 'metric' | 'imperial';
}

export interface Suggestion {
  division: DivisionName;
  reason: string;
  confidence: 'alta' | 'média' | 'baixa';
}
