import { DivisionName, Suggestion, WorkoutSession } from '../models/types';

export interface SuggestionContext {
  lastSession: WorkoutSession | null;
  weeklyFrequency: number;
  lumbarComplaintRecent: boolean;
  hasSquashTomorrow: boolean;
  hasSquashToday: boolean;
  daFitMetrics: {
    restingHR?: number;
    restingHRAverage?: number;
    sleepHours?: number;
  };
}

export const generateSuggestion = async (context: SuggestionContext): Promise<Suggestion> => {
  const { lastSession, weeklyFrequency, lumbarComplaintRecent, hasSquashTomorrow, hasSquashToday, daFitMetrics } = context;

  // REGRA 1: Lombar reclamou recentemente -> mobilidade/recuperação
  if (lumbarComplaintRecent) {
    return {
      division: 'mobilidade/recuperação',
      reason: 'Lombar reclamou nos últimos treinos. Foco em recuperação, mobilidade e proteção.',
      confidence: 'alta',
    };
  }

  // REGRA 2: FC de repouso subiu >10% -> intensidade reduzida
  if (daFitMetrics.restingHR && daFitMetrics.restingHRAverage) {
    const increase = ((daFitMetrics.restingHR - daFitMetrics.restingHRAverage) / daFitMetrics.restingHRAverage) * 100;
    if (increase > 10) {
      return {
        division: 'mobilidade/recuperação',
        reason: `Batimento cardíaco de repouso subiu ${Math.round(increase)}% vs. média. Recuperação insuficiente.`,
        confidence: 'alta',
      };
    }
  }

  // REGRA 3: Sono < 6 horas -> mobilidade/recuperação
  if (daFitMetrics.sleepHours && daFitMetrics.sleepHours < 6) {
    return {
      division: 'mobilidade/recuperação',
      reason: `Sono de apenas ${daFitMetrics.sleepHours}h. Priorizar recuperação sobre intensidade.`,
      confidence: 'alta',
    };
  }

  // REGRA 4: Squash hoje -> mobilidade/recuperação (já vai jogar)
  if (hasSquashToday) {
    return {
      division: 'mobilidade/recuperação',
      reason: 'Squash hoje. Ginásio dedicado a mobilidade, equilíbrio e preparação.',
      confidence: 'alta',
    };
  }

  // REGRA 5: Squash amanhã -> evitar pernas pesadas
  if (hasSquashTomorrow) {
    const safeDivisions: DivisionName[] = ['costas', 'peito', 'braços', 'core/lombar', 'mobilidade/recuperação'];
    const suggestion = getMostOverdueDivision(lastSession, safeDivisions, weeklyFrequency);
    return {
      division: suggestion,
      reason: 'Squash amanhã. Evitar pernas pesadas para disponibilidade no jogo.',
      confidence: 'alta',
    };
  }

  // REGRA 6: Frequência semanal baixa -> full-body para compensar
  if (weeklyFrequency <= 1) {
    return {
      division: 'full-body',
      reason: 'Apenas 1 treino esta semana. Full-body para manter consistência.',
      confidence: 'média',
    };
  }

  // REGRA 7: Grupo mais atrasado
  const allDivisions: DivisionName[] = ['pernas', 'costas', 'peito', 'braços', 'core/lombar', 'full-body', 'mobilidade/recuperação'];
  const mostOverdue = getMostOverdueDivision(lastSession, allDivisions, weeklyFrequency);

  return {
    division: mostOverdue,
    reason: `Último treino de ${lastSession?.division || 'N/A'} há ${getDaysSince(lastSession)} dias. ${mostOverdue} é o grupo mais atrasado.`,
    confidence: 'média',
  };
};

// Determina qual divisão está mais atrasado
function getMostOverdueDivision(lastSession: WorkoutSession | null, divisions: DivisionName[], weeklyFrequency: number): DivisionName {
  // Se nunca treinou, sugerir full-body
  if (!lastSession) return 'full-body';

  // Frequência 2x -> full-body
  if (weeklyFrequency <= 2) return 'full-body';

  // Frequência 3x -> rotação clássica
  if (weeklyFrequency === 3) {
    const rotation: DivisionName[] = ['pernas', 'costas', 'peito'];
    const lastIndex = rotation.indexOf(lastSession.division);
    if (lastIndex === -1) return 'pernas';
    return rotation[(lastIndex + 1) % rotation.length];
  }

  // Frequência 4x+ -> considerar core/lombar e mobilidade
  const highFreqRotation: DivisionName[] = ['pernas', 'costas', 'peito', 'core/lombar', 'mobilidade/recuperação'];
  const lastIndex = highFreqRotation.indexOf(lastSession.division);
  if (lastIndex === -1) return 'pernas';
  return highFreqRotation[(lastIndex + 1) % highFreqRotation.length];
}

// Calcula dias desde a última sessão
function getDaysSince(session: WorkoutSession | null): number {
  if (!session) return Infinity;
  const now = new Date();
  const sessionDate = new Date(session.date);
  const diffMs = now.getTime() - sessionDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
