import React from 'react';
import { Exercise } from '../models/types';

interface ExerciseIllustrationProps {
  exercise: Exercise;
  size?: number;
}

// Paleta de cores sofisticada
const PALETTE = {
  bg: '#f8f9fa',
  skin: '#f4a261',
  skinDark: '#e76f51',
  shirt: '#2a9d8f',
  shirtDark: '#264653',
  pants: '#6c757d',
  shoes: '#1a1a1a',
  machine: '#495057',
  machineLight: '#adb5bd',
  machineDark: '#343a40',
  accent: '#e9c46a',
  line: '#264653',
};

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({ exercise, size = 200 }) => {
  const illustrations: Record<string, React.ReactNode> = {
    'leg-press-001': <LegPressIllustration size={size} />,
    'extensao-pernas-001': <LegExtensionIllustration size={size} />,
    'flexao-pernas-001': <LegCurlIllustration size={size} />,
    'adutores-001': <AdductorIllustration size={size} />,
    'abducoes-001': <AbductorIllustration size={size} />,
    'panturrilha-001': <CalfRaiseIllustration size={size} />,
    'puxada-frontal-001': <LatPulldownIllustration size={size} />,
    'remada-sentada-001': <SeatedRowIllustration size={size} />,
    'face-pull-001': <FacePullIllustration size={size} />,
    'hyperextension-001': <HyperextensionIllustration size={size} />,
    'pullover-001': <PulloverIllustration size={size} />,
    'peito-maquina-001': <ChestPressIllustration size={size} />,
    'peito-inclinado-001': <InclinePressIllustration size={size} />,
    'crossover-001': <CrossoverIllustration size={size} />,
    'peck-deck-001': <PecDeckIllustration size={size} />,
    'flexoes-001': <PushUpIllustration size={size} />,
    'rosca-biceps-001': <BicepCurlIllustration size={size} />,
    'rosca-haltere-001': <DumbbellCurlIllustration size={size} />,
    'triceps-corda-001': <TricepRopeIllustration size={size} />,
    'triceps-maquina-001': <TricepMachineIllustration size={size} />,
    'rosca-martelo-001': <HammerCurlIllustration size={size} />,
    'triceps-frances-001': <TricepFrenchIllustration size={size} />,
    'prancha-001': <PlankIllustration size={size} />,
    'bridge-001': <BridgeIllustration size={size} />,
    'bird-dog-001': <BirdDogIllustration size={size} />,
    'dead-bug-001': <DeadBugIllustration size={size} />,
    'vacuo-abdominal-001': <StomachVacuumIllustration size={size} />,
    'prancha-lateral-001': <SidePlankIllustration size={size} />,
    'pallof-press-001': <PallofPressIllustration size={size} />,
    'rotacao-quadril-001': <HipRotationIllustration size={size} />,
    'abertura-tornozelo-001': <AnkleOpenIllustration size={size} />,
    'thoracic-rotation-001': <ThoracicRotationIllustration size={size} />,
    'cat-cow-001': <CatCowIllustration size={size} />,
    '9090-hip-001': <Hip9090Illustration size={size} />,
    'single-leg-balance-001': <BalanceIllustration size={size} />,
    'mobilidade-ombros-001': <ShoulderMobilityIllustration size={size} />,
  };

  return (
    <div className="exercise-illustration" style={{ width: size, height: size }}>
      {illustrations[exercise.id] || <GenericIllustration size={size} exercise={exercise} />}
    </div>
  );
};

const GenericIllustration: React.FC<{ size: number; exercise: Exercise }> = ({ size, exercise }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="80" r="40" fill={PALETTE.machineLight} />
    <rect x="70" y="120" width="60" height="50" rx="8" fill={PALETTE.accent} />
    <text x="100" y="100" textAnchor="middle" fontSize="24" fill={PALETTE.line} fontWeight="700">
      {exercise.name.substring(0, 2).toUpperCase()}
    </text>
  </svg>
);

// Componente base para figura humana estilizada
const HumanFigure: React.FC<{ 
  size: number; 
  pose: 'standing' | 'seated' | 'lying' | 'plank' | 'bridge' | 'pushup' | 'bird-dog' | 'dead-bug';
  x?: number;
  y?: number;
  scale?: number;
}> = ({ size, pose, x = 100, y = 100, scale = 1 }) => {
  const s = scale;
  const bx = x;
  const by = y;
  
  return (
    <g>
      {/* Cabeça */}
      <circle cx={bx} cy={by - 45*s} r={12*s} fill={PALETTE.skin} />
      {/* Tronco */}
      <rect x={bx - 15*s} y={by - 30*s} width={30*s} height={40*s} rx={6*s} fill={PALETTE.shirt} />
      {/* Braços */}
      <line x1={bx - 15*s} y1={by - 20*s} x2={bx - 30*s} y2={by + 5*s} stroke={PALETTE.skin} strokeWidth={6*s} strokeLinecap="round" />
      <line x1={bx + 15*s} y1={by - 20*s} x2={bx + 30*s} y2={by + 5*s} stroke={PALETTE.skin} strokeWidth={6*s} strokeLinecap="round" />
      {/* Pernas */}
      <line x1={bx - 8*s} y1={by + 10*s} x2={bx - 15*s} y2={by + 50*s} stroke={PALETTE.pants} strokeWidth={8*s} strokeLinecap="round" />
      <line x1={bx + 8*s} y1={by + 10*s} x2={bx + 15*s} y2={by + 50*s} stroke={PALETTE.pants} strokeWidth={8*s} strokeLinecap="round" />
      {/* Pés */}
      <ellipse cx={bx - 15*s} cy={by + 55*s} rx={8*s} ry={4*s} fill={PALETTE.shoes} />
      <ellipse cx={bx + 15*s} cy={by + 55*s} rx={8*s} ry={4*s} fill={PALETTE.shoes} />
    </g>
  );
};

const LegPressIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    {/* Base da máquina */}
    <rect x="40" y="140" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="145" width="100" height="30" rx="4" fill={PALETTE.machine} />
    {/* Encosto */}
    <rect x="60" y="80" width="80" height="60" rx="8" fill={PALETTE.machineLight} />
    <rect x="70" y="90" width="60" height="40" rx="4" fill={PALETTE.accent} />
    {/* Pernas empurrando */}
    <line x1="80" y1="110" x2="80" y2="70" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="120" y1="110" x2="120" y2="70" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Pés na plataforma */}
    <rect x="65" y="55" width="30" height="15" rx="4" fill={PALETTE.shoes} />
    <rect x="105" y="55" width="30" height="15" rx="4" fill={PALETTE.shoes} />
    {/* Plataforma */}
    <rect x="55" y="45" width="90" height="10" rx="3" fill={PALETTE.machineDark} />
    {/* Cabeça */}
    <circle cx="100" cy="65" r="14" fill={PALETTE.skin} />
  </svg>
);

const LegExtensionIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="70" y="130" width="60" height="35" rx="8" fill={PALETTE.machineDark} />
    <rect x="80" y="140" width="40" height="20" rx="4" fill={PALETTE.machine} />
    {/* Pernas estendidas */}
    <line x1="90" y1="130" x2="90" y2="70" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="110" y1="130" x2="110" y2="70" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Pés */}
    <ellipse cx="90" cy="65" rx="10" ry="6" fill={PALETTE.shoes} />
    <ellipse cx="110" cy="65" rx="10" ry="6" fill={PALETTE.shoes} />
    {/* Peso */}
    <rect x="75" y="50" width="50" height="12" rx="3" fill={PALETTE.machineDark} />
  </svg>
);

const LegCurlIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="70" y="130" width="60" height="35" rx="8" fill={PALETTE.machineDark} />
    <rect x="80" y="140" width="40" height="20" rx="4" fill={PALETTE.machine} />
    {/* Pernas deitadas, dobradas */}
    <line x1="90" y1="130" x2="90" y2="100" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="110" y1="130" x2="110" y2="100" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="90" y1="100" x2="75" y2="80" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="110" y1="100" x2="125" y2="80" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Pés */}
    <ellipse cx="75" cy="75" rx="10" ry="6" fill={PALETTE.shoes} />
    <ellipse cx="125" cy="75" rx="10" ry="6" fill={PALETTE.shoes} />
  </svg>
);

const AdductorIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="50" y="100" width="40" height="50" rx="8" fill={PALETTE.machineDark} />
    <rect x="110" y="100" width="40" height="50" rx="8" fill={PALETTE.machineDark} />
    <rect x="60" y="110" width="20" height="30" rx="4" fill={PALETTE.machine} />
    <rect x="120" y="110" width="20" height="30" rx="4" fill={PALETTE.machine} />
    {/* Pernas fechando */}
    <line x1="80" y1="125" x2="100" y2="125" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="120" y1="125" x2="100" y2="125" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

const AbductorIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="50" y="100" width="40" height="50" rx="8" fill={PALETTE.machineDark} />
    <rect x="110" y="100" width="40" height="50" rx="8" fill={PALETTE.machineDark} />
    <rect x="60" y="110" width="20" height="30" rx="4" fill={PALETTE.machine} />
    <rect x="120" y="110" width="20" height="30" rx="4" fill={PALETTE.machine} />
    {/* Pernas abrindo */}
    <line x1="80" y1="125" x2="70" y2="125" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="120" y1="125" x2="130" y2="125" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <path d="M70 125 L100 125 M130 125 L100 125" stroke={PALETTE.accent} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const CalfRaiseIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="70" y="130" width="60" height="35" rx="8" fill={PALETTE.machineDark} />
    <rect x="80" y="140" width="40" height="20" rx="4" fill={PALETTE.machine} />
    {/* Pernas em pé */}
    <line x1="90" y1="130" x2="90" y2="60" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="110" y1="130" x2="110" y2="60" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Pés em ponta */}
    <ellipse cx="90" cy="55" rx="12" ry="8" fill={PALETTE.shoes} />
    <ellipse cx="110" cy="55" rx="12" ry="8" fill={PALETTE.shoes} />
    {/* Peso nos ombros */}
    <rect x="70" y="45" width="60" height="10" rx="3" fill={PALETTE.machineDark} />
  </svg>
);

const LatPulldownIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="85" y="20" width="30" height="40" rx="4" fill={PALETTE.machineDark} />
    <rect x="70" y="60" width="60" height="50" rx="8" fill={PALETTE.machine} />
    <rect x="80" y="70" width="40" height="30" rx="4" fill={PALETTE.accent} />
    {/* Cabeça */}
    <circle cx="100" cy="55" r="14" fill={PALETTE.skin} />
    {/* Braços puxando */}
    <line x1="85" y1="65" x2="70" y2="85" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="115" y1="65" x2="130" y2="85" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    {/* Barra */}
    <rect x="60" y="80" width="80" height="8" rx="3" fill={PALETTE.machineDark} />
  </svg>
);

const SeatedRowIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="120" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="130" width="100" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="70" y="60" width="60" height="60" rx="8" fill={PALETTE.machineLight} />
    <rect x="80" y="70" width="40" height="40" rx="4" fill={PALETTE.accent} />
    {/* Cabeça */}
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
    {/* Braços puxando */}
    <line x1="75" y1="80" x2="55" y2="110" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="80" x2="145" y2="110" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const FacePullIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="85" y="20" width="30" height="40" rx="4" fill={PALETTE.machineDark} />
    <rect x="70" y="60" width="60" height="50" rx="8" fill={PALETTE.machine} />
    <rect x="80" y="70" width="40" height="30" rx="4" fill={PALETTE.accent} />
    <circle cx="100" cy="55" r="14" fill={PALETTE.skin} />
    {/* Braços para trás */}
    <line x1="85" y1="65" x2="60" y2="90" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="115" y1="65" x2="140" y2="90" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const HyperextensionIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="130" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="140" width="100" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="70" y="80" width="60" height="50" rx="8" fill={PALETTE.machineLight} />
    <rect x="80" y="90" width="40" height="30" rx="4" fill={PALETTE.accent} />
    {/* Corpo inclinado */}
    <line x1="100" y1="80" x2="100" y2="45" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <circle cx="100" cy="35" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="80" x2="85" y2="130" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="80" x2="115" y2="130" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

const PulloverIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="130" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="140" width="100" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="70" y="60" width="60" height="70" rx="8" fill={PALETTE.machineLight} />
    <rect x="80" y="70" width="40" height="50" rx="4" fill={PALETTE.accent} />
    {/* Braços estendidos */}
    <line x1="75" y1="80" x2="50" y2="60" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="80" x2="150" y2="60" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
  </svg>
);

const ChestPressIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="130" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="140" width="100" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="70" y="60" width="60" height="70" rx="8" fill={PALETTE.machineLight} />
    <rect x="80" y="70" width="40" height="50" rx="4" fill={PALETTE.accent} />
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
    {/* Braços empurrando */}
    <line x1="75" y1="80" x2="55" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="80" x2="145" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const InclinePressIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="130" width="120" height="40" rx="8" fill={PALETTE.machineDark} transform="rotate(-10 100 130)" />
    <rect x="50" y="140" width="100" height="25" rx="4" fill={PALETTE.machine} transform="rotate(-10 100 130)" />
    <rect x="70" y="60" width="60" height="70" rx="8" fill={PALETTE.machineLight} transform="rotate(-10 100 60)" />
    <rect x="80" y="70" width="40" height="50" rx="4" fill={PALETTE.accent} transform="rotate(-10 100 70)" />
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
    <line x1="75" y1="80" x2="55" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="80" x2="145" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const CrossoverIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="30" y="20" width="20" height="80" rx="4" fill={PALETTE.machineDark} />
    <rect x="150" y="20" width="20" height="80" rx="4" fill={PALETTE.machineDark} />
    <circle cx="100" cy="140" r="14" fill={PALETTE.skin} />
    {/* Braços cruzados */}
    <line x1="40" y1="100" x2="70" y2="130" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="160" y1="100" x2="130" y2="130" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const PecDeckIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="40" y="130" width="120" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="50" y="140" width="100" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="70" y="60" width="60" height="70" rx="8" fill={PALETTE.machineLight} />
    <rect x="80" y="70" width="40" height="50" rx="4" fill={PALETTE.accent} />
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
    {/* Braços abertos */}
    <line x1="75" y1="80" x2="50" y2="60" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="125" y1="80" x2="150" y2="60" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const PushUpIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    {/* Corpo em prancha */}
    <line x1="100" y1="60" x2="100" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <circle cx="100" cy="50" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="110" x2="70" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="110" x2="130" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Braços */}
    <line x1="100" y1="80" x2="70" y2="120" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="100" y1="80" x2="130" y2="120" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const BicepCurlIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="50" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="65" x2="100" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="110" x2="70" y2="140" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    {/* Barra */}
    <rect x="55" y="135" width="30" height="10" rx="4" fill={PALETTE.machineDark} />
    <rect x="50" y="130" width="8" height="20" rx="3" fill={PALETTE.machineDark} />
  </svg>
);

const DumbbellCurlIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="50" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="65" x2="100" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="110" x2="70" y2="140" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    {/* Haltere */}
    <rect x="50" y="130" width="40" height="12" rx="4" fill={PALETTE.machineDark} />
    <rect x="45" y="125" width="10" height="22" rx="3" fill={PALETTE.machineDark} />
    <rect x="85" y="125" width="10" height="22" rx="3" fill={PALETTE.machineDark} />
  </svg>
);

const TricepRopeIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="85" y="20" width="30" height="40" rx="4" fill={PALETTE.machineDark} />
    <line x1="100" y1="60" x2="100" y2="100" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="110" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="125" x2="70" y2="160" stroke={PALETTE.shirt} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="125" x2="130" y2="160" stroke={PALETTE.shirt} strokeWidth="12" strokeLinecap="round" />
  </svg>
);

const TricepMachineIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="70" y="120" width="60" height="40" rx="8" fill={PALETTE.machineDark} />
    <rect x="80" y="130" width="40" height="25" rx="4" fill={PALETTE.machine} />
    <rect x="85" y="60" width="30" height="60" rx="8" fill={PALETTE.machineLight} />
    <rect x="90" y="70" width="20" height="40" rx="4" fill={PALETTE.accent} />
    <circle cx="100" cy="45" r="14" fill={PALETTE.skin} />
    <line x1="85" y1="80" x2="65" y2="120" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="115" y1="80" x2="135" y2="120" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const HammerCurlIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="50" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="65" x2="100" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="110" x2="70" y2="130" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <rect x="55" y="125" width="30" height="12" rx="4" fill={PALETTE.machineDark} />
  </svg>
);

const TricepFrenchIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="50" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="65" x2="100" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="110" x2="130" y2="140" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <rect x="125" y="135" width="30" height="12" rx="4" fill={PALETTE.machineDark} />
  </svg>
);

const PlankIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    {/* Corpo em prancha */}
    <line x1="60" y1="160" x2="70" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="70" y1="110" x2="130" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="130" y1="110" x2="140" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="70" cy="100" r="14" fill={PALETTE.skin} />
  </svg>
);

const BridgeIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="160" x2="70" y2="110" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="70" y1="110" x2="130" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="130" y1="110" x2="140" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="100" cy="100" r="14" fill={PALETTE.skin} />
  </svg>
);

const BirdDogIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="160" x2="70" y2="110" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="70" y1="110" x2="130" y2="105" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="130" y1="105" x2="140" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="70" cy="100" r="14" fill={PALETTE.skin} />
    {/* Braço e perna estendidos */}
    <line x1="70" y1="110" x2="45" y2="85" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="130" y1="105" x2="155" y2="80" stroke={PALETTE.pants} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const DeadBugIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <circle cx="100" cy="100" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="86" x2="100" y2="60" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="114" x2="100" y2="140" stroke={PALETTE.pants} strokeWidth="16" strokeLinecap="round" />
    <line x1="86" y1="100" x2="60" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
    <line x1="114" y1="100" x2="140" y2="100" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const StomachVacuumIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="80" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="95" x2="100" y2="140" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="140" x2="85" y2="170" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="140" x2="115" y2="170" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    {/* Abdômen contraído */}
    <ellipse cx="100" cy="120" rx="20" ry="12" fill="none" stroke={PALETTE.shirtDark} strokeWidth="3" />
    <ellipse cx="100" cy="120" rx="12" ry="8" fill="none" stroke={PALETTE.shirtDark} strokeWidth="2" strokeDasharray="4 2" />
  </svg>
);

const SidePlankIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <line x1="60" y1="160" x2="60" y2="110" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="60" y1="110" x2="130" y2="110" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="130" y1="110" x2="130" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="60" cy="100" r="14" fill={PALETTE.skin} />
  </svg>
);

const PallofPressIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <rect x="85" y="20" width="30" height="40" rx="4" fill={PALETTE.machineDark} />
    <circle cx="100" cy="80" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="95" x2="100" y2="140" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" />
    <line x1="100" y1="140" x2="70" y2="170" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="140" x2="130" y2="170" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="110" x2="130" y2="110" stroke={PALETTE.skin} strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const HipRotationIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="100" r="40" fill="none" stroke={PALETTE.machineDark} strokeWidth="3" />
    <circle cx="100" cy="100" r="15" fill={PALETTE.shirt} />
    <circle cx="100" cy="100" r="8" fill={PALETTE.accent} />
    <path d="M100 60 L100 75 M100 125 L100 140 M60 100 L75 100 M125 100 L140 100" stroke={PALETTE.machineDark} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AnkleOpenIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="100" r="30" fill="none" stroke={PALETTE.machineDark} strokeWidth="3" />
    <path d="M100 70 L100 130" stroke={PALETTE.machineDark} strokeWidth="3" strokeLinecap="round" />
    <path d="M70 100 L100 100 M100 100 L130 100" stroke={PALETTE.machineDark} strokeWidth="2" strokeLinecap="round" />
    <circle cx="100" cy="100" r="8" fill={PALETTE.shirt} />
  </svg>
);

const ThoracicRotationIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="60" y1="60" x2="140" y2="60" stroke={PALETTE.machineDark} strokeWidth="3" strokeLinecap="round" />
    <line x1="100" y1="60" x2="100" y2="140" stroke={PALETTE.machineDark} strokeWidth="3" strokeLinecap="round" />
    <path d="M100 140 L70 110 M100 140 L130 110" stroke={PALETTE.machineDark} strokeWidth="3" strokeLinecap="round" />
    <circle cx="100" cy="100" r="12" fill={PALETTE.shirt} />
  </svg>
);

const CatCowIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <path d="M40 130 Q100 80 160 130" stroke={PALETTE.shirt} strokeWidth="16" strokeLinecap="round" fill="none" />
    <path d="M40 145 Q100 170 160 145" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="100" cy="95" r="14" fill={PALETTE.skin} />
  </svg>
);

const Hip9090Illustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="20" y1="160" x2="180" y2="160" stroke={PALETTE.machineDark} strokeWidth="4" strokeLinecap="round" />
    <line x1="70" y1="160" x2="70" y2="120" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="70" y1="120" x2="100" y2="120" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="100" y1="120" x2="100" y2="160" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="130" y1="160" x2="130" y2="120" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <line x1="130" y1="120" x2="100" y2="120" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="100" cy="110" r="14" fill={PALETTE.skin} />
  </svg>
);

const BalanceIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <line x1="100" y1="160" x2="100" y2="100" stroke={PALETTE.pants} strokeWidth="12" strokeLinecap="round" />
    <circle cx="100" cy="90" r="14" fill={PALETTE.skin} />
    <line x1="100" y1="100" x2="130" y2="70" stroke={PALETTE.shirt} strokeWidth="8" strokeLinecap="round" />
    <line x1="100" y1="100" x2="70" y2="105" stroke={PALETTE.shirt} strokeWidth="8" strokeLinecap="round" />
    {/* Linha de equilíbrio */}
    <ellipse cx="100" cy="165" rx="20" ry="5" fill="none" stroke={PALETTE.machineDark} strokeWidth="2" />
  </svg>
);

const ShoulderMobilityIllustration: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 200 200">
    <rect fill={PALETTE.bg} width="200" height="200" rx="12" />
    <circle cx="100" cy="100" r="35" fill="none" stroke={PALETTE.machineDark} strokeWidth="3" />
    <path d="M100 65 L100 50 M100 135 L100 150 M65 100 L50 100 M135 100 L150 100" stroke={PALETTE.machineDark} strokeWidth="2" strokeLinecap="round" />
    <circle cx="100" cy="100" r="10" fill={PALETTE.shirt} />
  </svg>
);
