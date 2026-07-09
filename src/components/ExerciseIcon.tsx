import React from 'react';
import { Exercise } from '../models/types';

interface ExerciseIconProps {
  exercise: Exercise;
  size?: number;
}

export const ExerciseIcon: React.FC<ExerciseIconProps> = ({ exercise, size = 80 }) => {
  const icons: Record<string, React.ReactNode> = {
    'leg-press-001': <LegPressIcon size={size} />,
    'extensao-pernas-001': <LegExtensionIcon size={size} />,
    'flexao-pernas-001': <LegCurlIcon size={size} />,
    'adutores-001': <AdductorIcon size={size} />,
    'abducoes-001': <AbductorIcon size={size} />,
    'panturrilha-001': <CalfRaiseIcon size={size} />,
    'puxada-frontal-001': <LatPulldownIcon size={size} />,
    'remada-sentada-001': <SeatedRowIcon size={size} />,
    'face-pull-001': <FacePullIcon size={size} />,
    'hyperextension-001': <HyperextensionIcon size={size} />,
    'pullover-001': <PulloverIcon size={size} />,
    'peito-maquina-001': <ChestPressIcon size={size} />,
    'peito-inclinado-001': <InclinePressIcon size={size} />,
    'crossover-001': <CrossoverIcon size={size} />,
    'peck-deck-001': <PecDeckIcon size={size} />,
    'flexoes-001': <PushUpIcon size={size} />,
    'rosca-biceps-001': <BicepCurlIcon size={size} />,
    'rosca-haltere-001': <DumbbellCurlIcon size={size} />,
    'triceps-corda-001': <TricepRopeIcon size={size} />,
    'triceps-maquina-001': <TricepMachineIcon size={size} />,
    'rosca-martelo-001': <HammerCurlIcon size={size} />,
    'triceps-frances-001': <TricepFrenchIcon size={size} />,
    'prancha-001': <PlankIcon size={size} />,
    'bridge-001': <BridgeIcon size={size} />,
    'bird-dog-001': <BirdDogIcon size={size} />,
    'dead-bug-001': <DeadBugIcon size={size} />,
    'vacuo-abdominal-001': <StomachVacuumIcon size={size} />,
    'prancha-lateral-001': <SidePlankIcon size={size} />,
    'pallof-press-001': <PallofPressIcon size={size} />,
    'rotacao-quadril-001': <HipRotationIcon size={size} />,
    'abertura-tornozelo-001': <AnkleOpenIcon size={size} />,
    'thoracic-rotation-001': <ThoracicRotationIcon size={size} />,
    'cat-cow-001': <CatCowIcon size={size} />,
    '9090-hip-001': <Hip9090Icon size={size} />,
    'single-leg-balance-001': <BalanceIcon size={size} />,
    'mobilidade-ombros-001': <ShoulderMobilityIcon size={size} />,
  };

  return (
    <div className="exercise-icon-wrapper" style={{ width: size, height: size }}>
      {icons[exercise.id] || <GenericIcon size={size} exercise={exercise} />}
    </div>
  );
};

const GenericIcon: React.FC<{ size: number; exercise: Exercise }> = ({ size, exercise }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="40" r="20" fill="#e9ecef" />
    <rect x="35" y="60" width="30" height="25" rx="4" fill="#dee2e6" />
    <text x="50" y="50" textAnchor="middle" fontSize="12" fill="#495057" fontWeight="600">
      {exercise.name.substring(0, 3).toUpperCase()}
    </text>
  </svg>
);

const LegPressIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="70" width="60" height="8" rx="2" fill="#6c757d" />
    <rect x="25" y="30" width="50" height="40" rx="4" fill="#495057" />
    <rect x="30" y="35" width="40" height="30" rx="2" fill="#adb5bd" />
    <circle cx="50" cy="78" r="5" fill="#1a1a1a" />
  </svg>
);

const LegExtensionIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="30" y="60" width="40" height="6" rx="2" fill="#6c757d" />
    <rect x="35" y="30" width="30" height="30" rx="4" fill="#495057" />
    <rect x="40" y="35" width="20" height="20" rx="2" fill="#adb5bd" />
    <path d="M45 62 L45 75 M55 62 L55 75" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const LegCurlIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="30" y="30" width="40" height="6" rx="2" fill="#6c757d" />
    <rect x="35" y="40" width="30" height="30" rx="4" fill="#495057" />
    <rect x="40" y="45" width="20" height="20" rx="2" fill="#adb5bd" />
    <path d="M45 30 L45 20 M55 30 L55 20" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AdductorIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="25" y="40" width="20" height="30" rx="4" fill="#495057" />
    <rect x="55" y="40" width="20" height="30" rx="4" fill="#495057" />
    <rect x="30" y="45" width="10" height="20" rx="2" fill="#adb5bd" />
    <rect x="60" y="45" width="10" height="20" rx="2" fill="#adb5bd" />
    <line x1="45" y1="55" x2="55" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AbductorIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="25" y="40" width="20" height="30" rx="4" fill="#495057" />
    <rect x="55" y="40" width="20" height="30" rx="4" fill="#495057" />
    <rect x="30" y="45" width="10" height="20" rx="2" fill="#adb5bd" />
    <rect x="60" y="45" width="10" height="20" rx="2" fill="#adb5bd" />
    <path d="M45 55 L55 55 M45 55 L50 48 M45 55 L50 62" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

const CalfRaiseIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="30" y="60" width="40" height="6" rx="2" fill="#6c757d" />
    <rect x="35" y="30" width="30" height="30" rx="4" fill="#495057" />
    <rect x="40" y="35" width="20" height="20" rx="2" fill="#adb5bd" />
    <path d="M35 75 L35 85 M45 75 L45 90 M55 75 L55 85 M65 75 L65 85" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const LatPulldownIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="45" y="10" width="10" height="25" rx="2" fill="#6c757d" />
    <rect x="30" y="35" width="40" height="30" rx="4" fill="#495057" />
    <rect x="35" y="40" width="30" height="20" rx="2" fill="#adb5bd" />
    <path d="M50 35 L50 25" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const SeatedRowIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="50" width="60" height="6" rx="2" fill="#6c757d" />
    <rect x="30" y="25" width="40" height="25" rx="4" fill="#495057" />
    <rect x="35" y="30" width="30" height="15" rx="2" fill="#adb5bd" />
    <path d="M25 50 L25 40 M75 50 L75 40" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const FacePullIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="45" y="10" width="10" height="20" rx="2" fill="#6c757d" />
    <rect x="30" y="30" width="40" height="30" rx="4" fill="#495057" />
    <rect x="35" y="35" width="30" height="20" rx="2" fill="#adb5bd" />
    <path d="M30 60 L40 75 M70 60 L60 75" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const HyperextensionIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="60" width="60" height="8" rx="2" fill="#6c757d" />
    <rect x="30" y="30" width="40" height="30" rx="4" fill="#495057" />
    <rect x="35" y="35" width="30" height="20" rx="2" fill="#adb5bd" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <path d="M50 30 L50 45" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PulloverIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="50" width="60" height="6" rx="2" fill="#6c757d" />
    <rect x="30" y="25" width="40" height="25" rx="4" fill="#495057" />
    <rect x="35" y="30" width="30" height="15" rx="2" fill="#adb5bd" />
    <path d="M25 40 L15 30 M75 40 L85 30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const ChestPressIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="55" width="60" height="6" rx="2" fill="#6c757d" />
    <rect x="30" y="25" width="40" height="30" rx="4" fill="#495057" />
    <rect x="35" y="30" width="30" height="20" rx="2" fill="#adb5bd" />
    <path d="M25 50 L35 40 M75 50 L65 40" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const InclinePressIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="55" width="60" height="6" rx="2" fill="#6c757d" transform="rotate(-10 50 55)" />
    <rect x="30" y="25" width="40" height="30" rx="4" fill="#495057" transform="rotate(-10 50 55)" />
    <rect x="35" y="30" width="30" height="20" rx="2" fill="#adb5bd" transform="rotate(-10 50 55)" />
    <path d="M25 52 L38 38 M75 45 L62 32" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const CrossoverIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="10" width="10" height="40" rx="2" fill="#6c757d" />
    <rect x="70" y="10" width="10" height="40" rx="2" fill="#6c757d" />
    <path d="M25 50 L50 75 L75 50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="78" r="4" fill="#1a1a1a" />
  </svg>
);

const PecDeckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="20" y="50" width="60" height="6" rx="2" fill="#6c757d" />
    <rect x="30" y="25" width="40" height="25" rx="4" fill="#495057" />
    <rect x="35" y="30" width="30" height="15" rx="2" fill="#adb5bd" />
    <path d="M25 40 L40 28 M75 40 L60 28" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PushUpIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="30" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="70" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const BicepCurlIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="35" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <rect x="30" y="65" width="10" height="15" rx="3" fill="#6c757d" />
  </svg>
);

const DumbbellCurlIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="35" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <rect x="28" y="65" width="14" height="15" rx="3" fill="#6c757d" />
  </svg>
);

const TricepRopeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="45" y="10" width="10" height="20" rx="2" fill="#6c757d" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 55 L40 80 M50 55 L60 80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const TricepMachineIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="30" y="50" width="40" height="6" rx="2" fill="#6c757d" />
    <rect x="35" y="25" width="30" height="25" rx="4" fill="#495057" />
    <rect x="40" y="30" width="20" height="15" rx="2" fill="#adb5bd" />
    <path d="M35 50 L35 75 M65 50 L65 75" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const HammerCurlIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="35" y2="65" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <rect x="30" y="60" width="10" height="15" rx="3" fill="#6c757d" />
  </svg>
);

const TricepFrenchIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="25" r="5" fill="#1a1a1a" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="65" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <rect x="62" y="65" width="10" height="15" rx="3" fill="#6c757d" />
  </svg>
);

const PlankIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="20" y1="80" x2="80" y2="80" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="80" x2="35" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="55" x2="65" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="55" x2="70" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="35" cy="50" r="4" fill="#1a1a1a" />
  </svg>
);

const BridgeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="20" y1="80" x2="80" y2="80" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="80" x2="35" y2="60" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="60" x2="65" y2="60" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="60" x2="70" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="35" cy="55" r="4" fill="#1a1a1a" />
  </svg>
);

const BirdDogIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="20" y1="80" x2="80" y2="80" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="80" x2="35" y2="60" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="60" x2="65" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="55" x2="70" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="60" x2="25" y2="45" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="55" x2="75" y2="40" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="35" cy="55" r="4" fill="#1a1a1a" />
  </svg>
);

const DeadBugIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
    <line x1="50" y1="42" x2="50" y2="30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="58" x2="50" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="42" y1="50" x2="30" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="58" y1="50" x2="70" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const StomachVacuumIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    <circle cx="50" cy="50" r="10" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
  </svg>
);

const SidePlankIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="20" y1="80" x2="80" y2="80" stroke="#6c757d" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="80" x2="30" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="55" x2="65" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="55" x2="65" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="30" cy="50" r="4" fill="#1a1a1a" />
  </svg>
);

const PallofPressIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <rect x="45" y="10" width="10" height="20" rx="2" fill="#6c757d" />
    <line x1="50" y1="30" x2="50" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="55" x2="35" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <rect x="30" y="65" width="10" height="15" rx="3" fill="#6c757d" />
  </svg>
);

const HipRotationIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
    <path d="M50 30 L50 38 M50 62 L50 70 M30 50 L38 50 M62 50 L70 50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const AnkleOpenIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="50" r="15" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M50 35 L50 65" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <path d="M35 50 L50 50 M50 50 L65 50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ThoracicRotationIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="30" y1="30" x2="70" y2="30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="30" x2="50" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <path d="M50 70 L35 55 M50 70 L65 55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const CatCowIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <path d="M20 60 Q50 20 80 60" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M20 70 Q50 90 80 70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

const Hip9090Icon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="30" y1="30" x2="30" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="50" x2="50" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="50" x2="50" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="30" x2="70" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="70" y1="50" x2="50" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="50" x2="50" y2="70" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const BalanceIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <line x1="50" y1="80" x2="50" y2="50" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <circle cx="50" cy="45" r="6" fill="#1a1a1a" />
    <line x1="50" y1="50" x2="65" y2="35" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="50" x2="35" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const ShoulderMobilityIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect fill="#f8f9fa" width="100" height="100" rx="8" />
    <circle cx="50" cy="50" r="20" fill="none" stroke="#1a1a1a" strokeWidth="3" />
    <path d="M50 30 L50 20 M50 70 L50 80 M30 50 L20 50 M70 50 L80 50" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="50" cy="50" r="5" fill="#1a1a1a" />
  </svg>
);
