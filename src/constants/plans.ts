import { WorkoutPlan, PlanDivision } from '../models/types';

export const DEFAULT_PLANS: WorkoutPlan[] = [
  // ============================================
  // PLANO 2x / SEMANA
  // ============================================
  {
    id: 'plan-2x',
    name: 'Plano 2x/semana',
    frequency: 2,
    isCustom: false,
    createdAt: new Date(),
    divisions: [
      {
        id: 'div-2x-1',
        name: 'full-body',
        dayIndex: 0, // segunda
        exercises: [
          'leg-press-001', 'puxada-frontal-001', 'peito-maquina-001',
          'prancha-001', 'panturrilha-001', 'rotacao-quadril-001',
        ],
      },
      {
        id: 'div-2x-2',
        name: 'full-body',
        dayIndex: 3, // quinta
        exercises: [
          'extensao-pernas-001', 'remada-sentada-001', 'peito-inclinado-001',
          'bridge-001', 'flexao-pernas-001', 'abertura-tornozelo-001',
        ],
      },
    ],
  },

  // ============================================
  // PLANO 3x / SEMANA (divisão clássica)
  // ============================================
  {
    id: 'plan-3x',
    name: 'Plano 3x/semana (divisão clássica)',
    frequency: 3,
    isCustom: false,
    createdAt: new Date(),
    divisions: [
      {
        id: 'div-3x-1',
        name: 'pernas',
        dayIndex: 0, // segunda
        exercises: [
          'leg-press-001', 'extensao-pernas-001', 'flexao-pernas-001',
          'adutores-001', 'abducoes-001', 'panturrilha-001',
          'prancha-001', 'rotacao-quadril-001',
        ],
      },
      {
        id: 'div-3x-2',
        name: 'costas',
        dayIndex: 2, // quarta
        exercises: [
          'puxada-frontal-001', 'remada-sentada-001', 'remada-unilateral-001',
          'face-pull-001', 'hyperextension-001', 'pullover-001',
          'prancha-lateral-001', 'mobilidade-ombros-001',
        ],
      },
      {
        id: 'div-3x-3',
        name: 'peito',
        dayIndex: 4, // sexta
        exercises: [
          'peito-maquina-001', 'peito-inclinado-001', 'crossover-001',
          'peck-deck-001', 'flexoes-001',
          'rosca-biceps-001', 'triceps-corda-001',
          'elevacao-lateral-001', 'desenvolvimento-ombros-001',
        ],
      },
    ],
  },

  // ============================================
  // PLANO 4x / SEMANA
  // ============================================
  {
    id: 'plan-4x',
    name: 'Plano 4x/semana',
    frequency: 4,
    isCustom: false,
    createdAt: new Date(),
    divisions: [
      {
        id: 'div-4x-1',
        name: 'pernas',
        dayIndex: 0, // segunda
        exercises: [
          'leg-press-001', 'extensao-pernas-001', 'adutores-001',
          'abducoes-001', 'panturrilha-001', 'prancha-001',
        ],
      },
      {
        id: 'div-4x-2',
        name: 'costas',
        dayIndex: 1, // terça
        exercises: [
          'puxada-frontal-001', 'remada-sentada-001', 'face-pull-001',
          'hyperextension-001', 'prancha-lateral-001', 'bird-dog-001',
        ],
      },
      {
        id: 'div-4x-3',
        name: 'peito',
        dayIndex: 3, // quinta
        exercises: [
          'peito-maquina-001', 'peito-inclinado-001', 'crossover-001',
          'rosca-biceps-001', 'triceps-corda-001', 'elevacao-lateral-001',
        ],
      },
      {
        id: 'div-4x-4',
        name: 'mobilidade/recuperação',
        dayIndex: 5, // sábado
        exercises: [
          'rotacao-quadril-001', 'abertura-tornozelo-001', 'thoracic-rotation-001',
          'cat-cow-001', '9090-hip-001', 'single-leg-balance-001',
          'vacuo-abdominal-001', 'dead-bug-001',
        ],
      },
    ],
  },

  // ============================================
  // PLANO 5x / SEMANA
  // ============================================
  {
    id: 'plan-5x',
    name: 'Plano 5x/semana',
    frequency: 5,
    isCustom: false,
    createdAt: new Date(),
    divisions: [
      {
        id: 'div-5x-1',
        name: 'pernas',
        dayIndex: 0, // segunda
        exercises: [
          'leg-press-001', 'extensao-pernas-001', 'flexao-pernas-001',
          'adutores-001', 'panturrilha-001', 'prancha-001',
        ],
      },
      {
        id: 'div-5x-2',
        name: 'costas',
        dayIndex: 1, // terça
        exercises: [
          'puxada-frontal-001', 'remada-sentada-001', 'face-pull-001',
          'hyperextension-001', 'prancha-lateral-001',
        ],
      },
      {
        id: 'div-5x-3',
        name: 'peito',
        dayIndex: 2, // quarta
        exercises: [
          'peito-maquina-001', 'peito-inclinado-001', 'peck-deck-001',
          'rosca-biceps-001', 'triceps-corda-001', 'elevacao-lateral-001',
        ],
      },
      {
        id: 'div-5x-4',
        name: 'core/lombar',
        dayIndex: 4, // sexta
        exercises: [
          'hyperextension-001', 'bridge-001', 'bird-dog-001',
          'dead-bug-001', 'vacuo-abdominal-001', 'prancha-001',
          'prancha-lateral-001', 'pallof-press-001',
        ],
      },
      {
        id: 'div-5x-5',
        name: 'mobilidade/recuperação',
        dayIndex: 6, // domingo
        exercises: [
          'rotacao-quadril-001', 'abertura-tornozelo-001', 'thoracic-rotation-001',
          'cat-cow-001', '9090-hip-001', 'single-leg-balance-001',
          'mobilidade-ombros-001',
        ],
      },
    ],
  },

  // ============================================
  // PLANO 6x / SEMANA
  // ============================================
  {
    id: 'plan-6x',
    name: 'Plano 6x/semana',
    frequency: 6,
    isCustom: false,
    createdAt: new Date(),
    divisions: [
      {
        id: 'div-6x-1',
        name: 'pernas',
        dayIndex: 0, // segunda
        exercises: [
          'leg-press-001', 'extensao-pernas-001', 'adutores-001',
          'panturrilha-001', 'prancha-001', 'rotacao-quadril-001',
        ],
      },
      {
        id: 'div-6x-2',
        name: 'costas',
        dayIndex: 1, // terça
        exercises: [
          'puxada-frontal-001', 'remada-sentada-001', 'face-pull-001',
          'hyperextension-001', 'prancha-lateral-001',
        ],
      },
      {
        id: 'div-6x-3',
        name: 'peito',
        dayIndex: 2, // quarta
        exercises: [
          'peito-maquina-001', 'peito-inclinado-001', 'crossover-001',
          'rosca-biceps-001', 'triceps-corda-001', 'elevacao-lateral-001',
        ],
      },
      {
        id: 'div-6x-4',
        name: 'core/lombar',
        dayIndex: 3, // quinta
        exercises: [
          'bridge-001', 'bird-dog-001', 'dead-bug-001',
          'vacuo-abdominal-001', 'prancha-001', 'pallof-press-001',
        ],
      },
      {
        id: 'div-6x-5',
        name: 'braços',
        dayIndex: 4, // sexta
        exercises: [
          'rosca-biceps-001', 'rosca-martelo-001', 'rosca-haltere-001',
          'triceps-corda-001', 'triceps-maquina-001', 'triceps-frances-001',
          'elevacao-lateral-001', 'desenvolvimento-ombros-001',
        ],
      },
      {
        id: 'div-6x-6',
        name: 'mobilidade/recuperação',
        dayIndex: 5, // sábado
        exercises: [
          'rotacao-quadril-001', 'abertura-tornozelo-001', 'thoracic-rotation-001',
          'cat-cow-001', '9090-hip-001', 'single-leg-balance-001',
          'mobilidade-ombros-001', 'half-kneeling-press-001',
        ],
      },
    ],
  },
];
