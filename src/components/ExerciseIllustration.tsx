import React from 'react';
import { Exercise } from '../models/types';

interface ExerciseIllustrationProps {
  exercise: Exercise;
  size?: number;
}

// Cores vibrantes e contrastantes — estilo flat illustration fitness profissional
const C = {
  bg: '#f0f4f8',
  floor: '#e2e8f0',
  skin: '#ffab76',
  skinShadow: '#e07a4e',
  shirt: '#00b4d8',
  shirtDark: '#0077b6',
  pants: '#2d3748',
  pantsLight: '#4a5568',
  shoes: '#1a202c',
  machine: '#718096',
  machineDark: '#4a5568',
  machineLight: '#a0aec0',
  accent: '#f6e05e',
  accentDark: '#d69e2e',
  red: '#fc8181',
  green: '#68d391',
  white: '#ffffff',
  text: '#1a202c',
  arrow: '#e53e3e',
};

// Figura humana base (estilo isométrico flat)
const Head = ({ cx, cy, r = 14 }: { cx: number; cy: number; r?: number }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={C.skin} />
    <circle cx={cx - 4} cy={cy - 3} r={2} fill={C.text} />
    <circle cx={cx + 4} cy={cy - 3} r={2} fill={C.text} />
    <path d={`M${cx - 5} ${cy + 4} Q${cx} ${cy + 8} ${cx + 5} ${cy + 4}`} stroke={C.text} strokeWidth={2} fill="none" strokeLinecap="round" />
  </g>
);

const Torso = ({ x1, y1, x2, y2, w = 20 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.shirt} strokeWidth={w} strokeLinecap="round" />
);

const Arm = ({ x1, y1, x2, y2, w = 10 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.skin} strokeWidth={w} strokeLinecap="round" />
);

const Leg = ({ x1, y1, x2, y2, w = 14 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.pants} strokeWidth={w} strokeLinecap="round" />
);

const Foot = ({ cx, cy, rx = 12, ry = 5 }: { cx: number; cy: number; rx?: number; ry?: number }) => (
  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={C.shoes} />
);

const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <g>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill={C.arrow} />
      </marker>
    </defs>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.arrow} strokeWidth={3} strokeLinecap="round" markerEnd="url(#arrowhead)" strokeDasharray="6 4" />
  </g>
);

const MachineBase = ({ x, y, w, h, rx = 8 }: { x: number; y: number; w: number; h: number; rx?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={C.machineDark} />
);

const MachinePad = ({ x, y, w, h, rx = 6 }: { x: number; y: number; w: number; h: number; rx?: number }) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={C.accent} />
);

const Bar = ({ x1, y1, x2, y2, w = 8 }: { x1: number; y1: number; x2: number; y2: number; w?: number }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.machineDark} strokeWidth={w} strokeLinecap="round" />
);

const Weight = ({ cx, cy, r = 14 }: { cx: number; cy: number; r?: number }) => (
  <circle cx={cx} cy={cy} r={r} fill={C.machineLight} stroke={C.machineDark} strokeWidth={2} />
);

const Bench = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={6} fill={C.machineDark} />
    <rect x={x + 5} y={y + 5} width={w - 10} height={h - 10} rx={4} fill={C.machine} />
  </g>
);

const Floor = () => (
  <rect x={0} y={160} width={200} height={40} fill={C.floor} />
);

export const ExerciseIllustration: React.FC<ExerciseIllustrationProps> = ({ exercise, size = 200 }) => {
  const id = exercise.id;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ borderRadius: 12 }}>
      <rect width={200} height={200} fill={C.bg} rx={12} />
      <Floor />
      {renderExercise(id)}
    </svg>
  );
};

function renderExercise(id: string): React.ReactNode {
  switch (id) {
    // ===================== PERNAS =====================
    case 'leg-press-001':
      return (
        <g>
          <MachineBase x={30} y={120} w={140} h={50} />
          <MachinePad x={50} y={105} w={100} h={15} />
          <rect x={45} y={75} width={110} height={30} rx={4} fill={C.machine} />
          <rect x={50} y={80} width={100} height={20} rx={3} fill={C.accent} />
          <Head cx={100} cy={60} />
          <Torso x1={100} y1={75} x2={100} y2={105} w={22} />
          <Leg x1={85} y1={105} x2={85} y2={65} w={16} />
          <Leg x1={115} y1={105} x2={115} y2={65} w={16} />
          <Foot cx={85} cy={60} rx={14} ry={6} />
          <Foot cx={115} cy={60} rx={14} ry={6} />
          <Arrow x1={70} y1={50} x2={70} y2={90} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>LEG PRESS</text>
        </g>
      );

    case 'extensao-pernas-001':
      return (
        <g>
          <MachineBase x={50} y={130} w={100} h={40} />
          <MachinePad x={70} y={115} w={60} h={15} />
          <Head cx={100} cy={95} />
          <Torso x1={100} y1={110} x2={100} y2={135} w={22} />
          <Leg x1={85} y1={135} x2={85} y2={75} w={16} />
          <Leg x1={115} y1={135} x2={115} y2={75} w={16} />
          <Foot cx={85} cy={70} rx={14} ry={6} />
          <Foot cx={115} cy={70} rx={14} ry={6} />
          <Arrow x1={70} y1={55} x2={70} y2={85} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>EXTENSÃO PERNAS</text>
        </g>
      );

    case 'flexao-pernas-001':
      return (
        <g>
          <MachineBase x={50} y={130} w={100} h={40} />
          <MachinePad x={70} y={115} w={60} h={15} />
          <Head cx={100} cy={95} />
          <Torso x1={100} y1={110} x2={100} y2={135} w={22} />
          <Leg x1={85} y1={135} x2={85} y2={105} w={16} />
          <Leg x1={115} y1={135} x2={115} y2={105} w={16} />
          <Leg x1={85} y1={105} x2={70} y2={80} w={14} />
          <Leg x1={115} y1={105} x2={130} y2={80} w={14} />
          <Foot cx={70} cy={75} rx={14} ry={6} />
          <Foot cx={130} cy={75} rx={14} ry={6} />
          <Arrow x1={60} y1={70} x2={60} y2={110} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>FLEXÃO PERNAS</text>
        </g>
      );

    case 'adutores-001':
      return (
        <g>
          <MachineBase x={40} y={120} w={60} h={40} />
          <MachineBase x={100} y={120} w={60} h={40} />
          <MachinePad x={50} y={105} w={40} h={15} />
          <MachinePad x={110} y={105} w={40} h={15} />
          <Head cx={100} cy={90} />
          <Torso x1={100} y1={105} x2={100} y2={125} w={22} />
          <Leg x1={85} y1={125} x2={85} y2={105} w={16} />
          <Leg x1={115} y1={125} x2={115} y2={105} w={16} />
          <Arrow x1={75} y1={100} x2={90} y2={100} />
          <Arrow x1={125} y1={100} x2={110} y2={100} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ADUTORES</text>
        </g>
      );

    case 'abducoes-001':
      return (
        <g>
          <MachineBase x={40} y={120} w={60} h={40} />
          <MachineBase x={100} y={120} w={60} h={40} />
          <MachinePad x={50} y={105} w={40} h={15} />
          <MachinePad x={110} y={105} w={40} h={15} />
          <Head cx={100} cy={90} />
          <Torso x1={100} y1={105} x2={100} y2={125} w={22} />
          <Leg x1={85} y1={125} x2={70} y2={105} w={16} />
          <Leg x1={115} y1={125} x2={130} y2={105} w={16} />
          <Arrow x1={65} y1={100} x2={80} y2={100} />
          <Arrow x1={135} y1={100} x2={120} y2={100} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ABDUÇÕES</text>
        </g>
      );

    case 'panturrilha-001':
      return (
        <g>
          <MachineBase x={50} y={130} w={100} h={40} />
          <MachinePad x={70} y={115} w={60} h={15} />
          <rect x={60} y={70} width={80} height={10} rx={3} fill={C.machineDark} />
          <Head cx={100} cy={55} />
          <Torso x1={100} y1={70} x2={100} y2={115} w={22} />
          <Leg x1={85} y1={115} x2={85} y2={55} w={16} />
          <Leg x1={115} y1={115} x2={115} y2={55} w={16} />
          <Foot cx={85} cy={50} rx={14} ry={6} />
          <Foot cx={115} cy={50} rx={14} ry={6} />
          <Arrow x1={70} y1={40} x2={70} y2={70} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PANTURRILHA</text>
        </g>
      );

    case 'agachamento-goblet-001':
      return (
        <g>
          <Head cx={100} cy={70} />
          <Torso x1={100} y1={85} x2={100} y2={130} w={22} />
          <Arm x1={85} y1={90} x2={85} y2={120} w={10} />
          <Arm x1={115} y1={90} x2={115} y2={120} w={10} />
          <circle cx={100} cy={120} r={12} fill={C.machineDark} />
          <Leg x1={85} y1={130} x2={70} y2={165} w={16} />
          <Leg x1={115} y1={130} x2={130} y2={165} w={16} />
          <Foot cx={70} cy={165} rx={14} ry={6} />
          <Foot cx={130} cy={165} rx={14} ry={6} />
          <Arrow x1={55} y1={140} x2={55} y2={100} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>GOBLET SQUAT</text>
        </g>
      );

    case 'step-up-001':
      return (
        <g>
          <Bench x={120} y={140} w={60} h={20} />
          <Head cx={100} cy={80} />
          <Torso x1={100} y1={95} x2={100} y2={130} w={22} />
          <Arm x1={85} y1={100} x2={70} y2={120} w={10} />
          <Arm x1={115} y1={100} x2={130} y2={120} w={10} />
          <circle cx={70} cy={120} r={8} fill={C.machineDark} />
          <circle cx={130} cy={120} r={8} fill={C.machineDark} />
          <Leg x1={95} y1={130} x2={95} y2={140} w={16} />
          <Leg x1={105} y1={130} x2={105} y2={160} w={16} />
          <Foot cx={95} cy={140} rx={14} ry={6} />
          <Foot cx={105} cy={165} rx={14} ry={6} />
          <Arrow x1={80} y1={110} x2={80} y2={80} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>STEP UP</text>
        </g>
      );

    // ===================== COSTAS =====================
    case 'puxada-frontal-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={40} y1={80} x2={160} y2={80} w={8} />
          <Head cx={100} cy={95} />
          <Torso x1={100} y1={110} x2={100} y2={145} w={22} />
          <Arm x1={85} y1={115} x2={55} y2={85} w={10} />
          <Arm x1={115} y1={115} x2={145} y2={85} w={10} />
          <Leg x1={85} y1={145} x2={85} y2={170} w={16} />
          <Leg x1={115} y1={145} x2={115} y2={170} w={16} />
          <Foot cx={85} cy={170} rx={14} ry={6} />
          <Foot cx={115} cy={170} rx={14} ry={6} />
          <Arrow x1={50} y1={95} x2={50} y2={75} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PUXADA FRONTAL</text>
        </g>
      );

    case 'remada-sentada-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={110} x2={50} y2={110} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={110} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={100} x2={35} y2={120} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>REMADA SENTADA</text>
        </g>
      );

    case 'remada-unilateral-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={110} x2={50} y2={110} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={110} w={10} />
          <Arm x1={115} y1={95} x2={115} y2={130} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={100} x2={35} y2={120} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>REMADA 1 BRAÇO</text>
        </g>
      );

    case 'pullover-001':
      return (
        <g>
          <Bench x={50} y={130} w={100} h={25} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={120} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={75} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={75} w={10} />
          <circle cx={55} cy={75} r={10} fill={C.machineDark} />
          <circle cx={145} cy={75} r={10} fill={C.machineDark} />
          <Leg x1={90} y1={120} x2={90} y2={155} w={14} />
          <Leg x1={110} y1={120} x2={110} y2={155} w={14} />
          <Foot cx={90} cy={155} rx={12} ry={5} />
          <Foot cx={110} cy={155} rx={12} ry={5} />
          <Arrow x1={45} y1={65} x2={45} y2={95} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PULLOVER</text>
        </g>
      );

    case 'face-pull-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={100} y1={60} x2={100} y2={100} w={4} />
          <Head cx={100} cy={115} r={12} />
          <Torso x1={100} y1={130} x2={100} y2={155} w={20} />
          <Arm x1={85} y1={135} x2={70} y2={110} w={10} />
          <Arm x1={115} y1={135} x2={130} y2={110} w={10} />
          <circle cx={70} cy={110} r={6} fill={C.machineDark} />
          <circle cx={130} cy={110} r={6} fill={C.machineDark} />
          <Leg x1={90} y1={155} x2={90} y2={170} w={14} />
          <Leg x1={110} y1={155} x2={110} y2={170} w={14} />
          <Foot cx={90} cy={170} rx={12} ry={5} />
          <Foot cx={110} cy={170} rx={12} ry={5} />
          <Arrow x1={60} y1={105} x2={60} y2={125} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>FACE PULL</text>
        </g>
      );

    case 'hyperextension-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <MachinePad x={50} y={85} w={20} h={20} rx={4} />
          <Head cx={70} cy={55} r={12} />
          <Torso x1={70} y1={70} x2={70} y2={95} w={20} />
          <Arm x1={60} y1={75} x2={50} y2={85} w={10} />
          <Arm x1={80} y1={75} x2={90} y2={85} w={10} />
          <Leg x1={70} y1={95} x2={90} y2={120} w={14} />
          <Leg x1={70} y1={95} x2={50} y2={120} w={14} />
          <Foot cx={90} cy={120} rx={12} ry={5} />
          <Foot cx={50} cy={120} rx={12} ry={5} />
          <Arrow x1={85} y1={50} x2={85} y2={70} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>HIPEREXTENSÃO</text>
        </g>
      );

    // ===================== PEITO =====================
    case 'peito-maquina-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={110} x2={50} y2={110} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={110} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={100} x2={35} y2={120} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PEITO MÁQUINA</text>
        </g>
      );

    case 'peito-inclinado-001':
      return (
        <g>
          <MachineBase x={50} y={125} w={100} h={35} />
          <MachinePad x={70} y={110} w={60} h={15} />
          <Bar x1={30} y1={100} x2={50} y2={100} w={8} />
          <Head cx={100} cy={65} r={12} />
          <Torso x1={100} y1={80} x2={100} y2={100} w={20} />
          <Arm x1={85} y1={85} x2={55} y2={100} w={10} />
          <Arm x1={115} y1={85} x2={145} y2={100} w={10} />
          <Leg x1={90} y1={100} x2={90} y2={135} w={14} />
          <Leg x1={110} y1={100} x2={110} y2={135} w={14} />
          <Foot cx={90} cy={135} rx={12} ry={5} />
          <Foot cx={110} cy={135} rx={12} ry={5} />
          <Arrow x1={35} y1={90} x2={35} y2={110} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PEITO INCLINADO</text>
        </g>
      );

    case 'crossover-001':
      return (
        <g>
          <MachineBase x={30} y={20} w={20} h={60} />
          <MachineBase x={150} y={20} w={20} h={60} />
          <Bar x1={40} y1={80} x2={70} y2={130} w={4} />
          <Bar x1={160} y1={80} x2={130} y2={130} w={4} />
          <Head cx={100} cy={150} r={12} />
          <Torso x1={100} y1={165} x2={100} y2={185} w={20} />
          <Arm x1={85} y1={170} x2={70} y2={130} w={10} />
          <Arm x1={115} y1={170} x2={130} y2={130} w={10} />
          <Leg x1={90} y1={185} x2={90} y2={200} w={14} />
          <Leg x1={110} y1={185} x2={110} y2={200} w={14} />
          <Arrow x1={75} y1={125} x2={85} y2={145} />
          <Arrow x1={125} y1={125} x2={115} y2={145} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>CROSSOVER</text>
        </g>
      );

    case 'peck-deck-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={110} x2={50} y2={110} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={110} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={100} x2={35} y2={120} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PECK DECK</text>
        </g>
      );

    case 'flexoes-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={75} x2={70} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={130} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={155} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={155} w={14} />
          <Foot cx={90} cy={155} rx={12} ry={5} />
          <Foot cx={110} cy={155} rx={12} ry={5} />
          <Arrow x1={60} y1={95} x2={60} y2={70} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>FLEXÕES</text>
        </g>
      );

    // ===================== BRAÇOS =====================
    case 'rosca-biceps-001':
      return (
        <g>
          <MachineBase x={70} y={120} w={60} h={40} />
          <MachinePad x={80} y={105} w={40} h={15} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={85} y2={65} w={10} />
          <Arm x1={115} y1={95} x2={115} y2={65} w={10} />
          <Bar x1={70} y1={60} x2={130} y2={60} w={8} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={75} y1={50} x2={75} y2={75} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ROSCA BÍCEPS</text>
        </g>
      );

    case 'rosca-haltere-001':
      return (
        <g>
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={85} y2={65} w={10} />
          <Arm x1={115} y1={95} x2={115} y2={65} w={10} />
          <circle cx={85} cy={60} r={10} fill={C.machineDark} />
          <circle cx={115} cy={60} r={10} fill={C.machineDark} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={75} y1={50} x2={75} y2={75} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ROSCA HALTERES</text>
        </g>
      );

    case 'triceps-corda-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={100} y1={60} x2={100} y2={90} w={4} />
          <line x1={95} y1={95} x2={105} y2={95} stroke={C.machineDark} strokeWidth={4} />
          <Head cx={100} cy={105} r={12} />
          <Torso x1={100} y1={120} x2={100} y2={145} w={20} />
          <Arm x1={85} y1={125} x2={85} y2={95} w={10} />
          <Arm x1={115} y1={125} x2={115} y2={95} w={10} />
          <Leg x1={90} y1={145} x2={90} y2={170} w={14} />
          <Leg x1={110} y1={145} x2={110} y2={170} w={14} />
          <Foot cx={90} cy={170} rx={12} ry={5} />
          <Foot cx={110} cy={170} rx={12} ry={5} />
          <Arrow x1={85} y1={90} x2={85} y2={115} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>TRÍCEPS CORDA</text>
        </g>
      );

    case 'triceps-maquina-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={110} x2={50} y2={110} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={110} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={100} x2={35} y2={120} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>TRÍCEPS MÁQUINA</text>
        </g>
      );

    case 'triceps-frances-001':
      return (
        <g>
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={115} y2={75} w={10} />
          <Arm x1={115} y1={95} x2={115} y2={75} w={10} />
          <circle cx={115} cy={70} r={10} fill={C.machineDark} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={105} y1={65} x2={105} y2={90} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>TRÍCEPS FRANCÊS</text>
        </g>
      );

    case 'rosca-martelo-001':
      return (
        <g>
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={85} y2={65} w={10} />
          <Arm x1={115} y1={95} x2={115} y2={65} w={10} />
          <circle cx={85} cy={60} r={10} fill={C.machineDark} />
          <circle cx={115} cy={60} r={10} fill={C.machineDark} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={75} y1={50} x2={75} y2={75} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ROSCA MARTELO</text>
        </g>
      );

    // ===================== OMBROS =====================
    case 'elevacao-lateral-001':
      return (
        <g>
          <MachineBase x={70} y={120} w={60} h={40} />
          <MachinePad x={80} y={105} w={40} h={15} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={70} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={70} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={50} y1={65} x2={50} y2={90} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ELEVAÇÃO LATERAL</text>
        </g>
      );

    case 'elevacao-lateral-haltere-001':
      return (
        <g>
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={70} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={70} w={10} />
          <circle cx={55} cy={65} r={10} fill={C.machineDark} />
          <circle cx={145} cy={65} r={10} fill={C.machineDark} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={50} y1={65} x2={50} y2={90} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ELEVAÇÃO HALTERES</text>
        </g>
      );

    case 'desenvolvimento-ombros-001':
      return (
        <g>
          <MachineBase x={50} y={120} w={100} h={40} />
          <MachinePad x={70} y={105} w={60} h={15} />
          <Bar x1={30} y1={60} x2={50} y2={60} w={8} />
          <Head cx={100} cy={75} r={12} />
          <Torso x1={100} y1={90} x2={100} y2={110} w={20} />
          <Arm x1={85} y1={95} x2={55} y2={60} w={10} />
          <Arm x1={115} y1={95} x2={145} y2={60} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={145} w={14} />
          <Foot cx={90} cy={145} rx={12} ry={5} />
          <Foot cx={110} cy={145} rx={12} ry={5} />
          <Arrow x1={35} y1={50} x2={35} y2={80} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>DESENV. OMBROS</text>
        </g>
      );

    case 'elevacao-frontal-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={100} y1={60} x2={100} y2={90} w={4} />
          <Head cx={100} cy={105} r={12} />
          <Torso x1={100} y1={120} x2={100} y2={145} w={20} />
          <Arm x1={85} y1={125} x2={85} y2={95} w={10} />
          <Arm x1={115} y1={125} x2={115} y2={95} w={10} />
          <circle cx={85} cy={90} r={6} fill={C.machineDark} />
          <circle cx={115} cy={90} r={6} fill={C.machineDark} />
          <Leg x1={90} y1={145} x2={90} y2={170} w={14} />
          <Leg x1={110} y1={145} x2={110} y2={170} w={14} />
          <Foot cx={90} cy={170} rx={12} ry={5} />
          <Foot cx={110} cy={170} rx={12} ry={5} />
          <Arrow x1={75} y1={85} x2={75} y2={110} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ELEVAÇÃO FRONTAL</text>
        </g>
      );

    // ===================== CORE =====================
    case 'prancha-001':
      return (
        <g>
          <Head cx={70} cy={95} r={12} />
          <Torso x1={70} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={60} y1={115} x2={50} y2={110} w={10} />
          <Arm x1={80} y1={115} x2={90} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Foot cx={130} cy={110} rx={12} ry={5} />
          <rect x={45} y={120} width={90} height={5} rx={2} fill={C.green} opacity={0.7} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PRANCHA</text>
        </g>
      );

    case 'prancha-lateral-001':
      return (
        <g>
          <Head cx={60} cy={95} r={12} />
          <Torso x1={60} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={50} y1={115} x2={40} y2={110} w={10} />
          <Arm x1={70} y1={115} x2={80} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Foot cx={130} cy={110} rx={12} ry={5} />
          <rect x={35} y={120} width={90} height={5} rx={2} fill={C.green} opacity={0.7} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PRANCHA LATERAL</text>
        </g>
      );

    case 'bird-dog-001':
      return (
        <g>
          <Head cx={70} cy={95} r={12} />
          <Torso x1={70} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={60} y1={115} x2={45} y2={85} w={10} />
          <Arm x1={80} y1={115} x2={95} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Foot cx={130} cy={110} rx={12} ry={5} />
          <Arrow x1={40} y1={80} x2={40} y2={60} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>BIRD DOG</text>
        </g>
      );

    case 'bridge-001':
      return (
        <g>
          <Head cx={70} cy={55} r={12} />
          <Torso x1={70} y1={70} x2={70} y2={100} w={20} />
          <Arm x1={60} y1={75} x2={50} y2={90} w={10} />
          <Arm x1={80} y1={75} x2={90} y2={90} w={10} />
          <Leg x1={70} y1={100} x2={100} y2={100} w={14} />
          <Leg x1={70} y1={100} x2={100} y2={100} w={14} />
          <Leg x1={100} y1={100} x2={130} y2={130} w={14} />
          <Foot cx={130} cy={130} rx={12} ry={5} />
          <Arrow x1={85} y1={85} x2={85} y2={65} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>BRIDGE</text>
        </g>
      );

    case 'vacuo-abdominal-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={150} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={150} w={14} />
          <Foot cx={90} cy={150} rx={12} ry={5} />
          <Foot cx={110} cy={150} rx={12} ry={5} />
          <ellipse cx={100} cy={95} rx={20} ry={12} fill="none" stroke={C.red} strokeWidth={3} strokeDasharray="5 3" />
          <ellipse cx={100} cy={95} rx={12} ry={8} fill="none" stroke={C.red} strokeWidth={2} strokeDasharray="3 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>VÁCUO ABDOMINAL</text>
        </g>
      );

    case 'dead-bug-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={90} w={22} />
          <Arm x1={85} y1={75} x2={65} y2={55} w={10} />
          <Arm x1={115} y1={75} x2={135} y2={55} w={10} />
          <Leg x1={85} y1={90} x2={65} y2={110} w={14} />
          <Leg x1={115} y1={90} x2={135} y2={110} w={14} />
          <ellipse cx={100} cy={85} rx={18} ry={10} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="4 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>DEAD BUG</text>
        </g>
      );

    case 'pallof-press-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={100} y1={60} x2={100} y2={100} w={4} />
          <Head cx={100} cy={115} r={12} />
          <Torso x1={100} y1={130} x2={100} y2={155} w={20} />
          <Arm x1={85} y1={135} x2={100} y2={100} w={10} />
          <Arm x1={115} y1={135} x2={100} y2={100} w={10} />
          <circle cx={100} cy={100} r={6} fill={C.machineDark} />
          <Leg x1={90} y1={155} x2={90} y2={170} w={14} />
          <Leg x1={110} y1={155} x2={110} y2={170} w={14} />
          <Foot cx={90} cy={170} rx={12} ry={5} />
          <Foot cx={110} cy={170} rx={12} ry={5} />
          <Arrow x1={85} y1={95} x2={85} y2={115} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>PALLOF PRESS</text>
        </g>
      );

    // ===================== MOBILIDADE =====================
    case 'rotacao-quadril-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={150} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={150} w={14} />
          <Foot cx={90} cy={150} rx={12} ry={5} />
          <Foot cx={110} cy={150} rx={12} ry={5} />
          <circle cx={100} cy={110} r={30} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="8 4" />
          <Arrow x1={75} y1={90} x2={85} y2={100} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ROTAÇÃO QUADRIL</text>
        </g>
      );

    case 'abertura-tornozelo-001':
      return (
        <g>
          <rect x={20} y={40} width={30} height={120} rx={4} fill={C.machineDark} />
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={90} y2={150} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={150} w={14} />
          <Foot cx={90} cy={150} rx={12} ry={5} />
          <Foot cx={110} cy={150} rx={12} ry={5} />
          <line x1={75} y1={140} x2={55} y2={140} stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
          <Arrow x1={70} y1={130} x2={60} y2={140} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>TORNOZELO</text>
        </g>
      );

    case 'mobilidade-ombros-001':
      return (
        <g>
          <MachineBase x={80} y={20} w={40} h={40} />
          <Bar x1={100} y1={60} x2={100} y2={90} w={4} />
          <Head cx={100} cy={105} r={12} />
          <Torso x1={100} y1={120} x2={100} y2={145} w={20} />
          <Arm x1={85} y1={125} x2={85} y2={90} w={10} />
          <Arm x1={115} y1={125} x2={115} y2={130} w={10} />
          <circle cx={85} cy={85} r={6} fill={C.machineDark} />
          <circle cx={115} cy={100} r={25} fill="none" stroke={C.accent} strokeWidth={3} strokeDasharray="8 4" />
          <Leg x1={90} y1={145} x2={90} y2={170} w={14} />
          <Leg x1={110} y1={145} x2={110} y2={170} w={14} />
          <Foot cx={90} cy={170} rx={12} ry={5} />
          <Foot cx={110} cy={170} rx={12} ry={5} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>MOBILIDADE OMBROS</text>
        </g>
      );

    case 'thoracic-rotation-001':
      return (
        <g>
          <Head cx={70} cy={95} r={12} />
          <Torso x1={70} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={60} y1={115} x2={50} y2={110} w={10} />
          <Arm x1={80} y1={115} x2={90} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Foot cx={130} cy={110} rx={12} ry={5} />
          <line x1={60} y1={100} x2={80} y2={80} stroke={C.accent} strokeWidth={4} strokeLinecap="round" />
          <Arrow x1={75} y1={85} x2={85} y2={75} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>ROTAÇÃO TORÁCICA</text>
        </g>
      );

    case 'cat-cow-001':
      return (
        <g>
          <path d="M40 130 Q100 80 160 130" stroke={C.shirt} strokeWidth={18} strokeLinecap="round" fill="none" />
          <path d="M40 145 Q100 170 160 145" stroke={C.pants} strokeWidth={14} strokeLinecap="round" fill="none" />
          <Head cx={100} cy={95} r={12} />
          <Arrow x1={85} y1={85} x2={85} y2={70} />
          <Arrow x1={115} y1={70} x2={115} y2={85} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>CAT-COW</text>
        </g>
      );

    case '9090-hip-001':
      return (
        <g>
          <Head cx={70} cy={95} r={12} />
          <Torso x1={70} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={60} y1={115} x2={50} y2={110} w={10} />
          <Arm x1={80} y1={115} x2={90} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={120} y2={110} w={14} />
          <Leg x1={120} y1={110} x2={130} y2={130} w={14} />
          <Leg x1={100} y1={110} x2={110} y2={130} w={14} />
          <Foot cx={130} cy={130} rx={12} ry={5} />
          <Foot cx={110} cy={130} rx={12} ry={5} />
          <rect x={85} y={105} width={20} height={20} rx={3} fill="none" stroke={C.accent} strokeWidth={2} strokeDasharray="4 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>90-90 HIP</text>
        </g>
      );

    case 'single-leg-balance-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={100} y2={150} w={14} />
          <Leg x1={100} y1={110} x2={120} y2={90} w={14} />
          <Foot cx={100} cy={150} rx={12} ry={5} />
          <Foot cx={120} cy={90} rx={12} ry={5} />
          <ellipse cx={100} cy={155} rx={25} ry={6} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="4 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>EQUILÍBRIO 1 PERNA</text>
        </g>
      );

    case 'shoulder-dislocates-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={55} y2={55} w={10} />
          <Arm x1={115} y1={75} x2={145} y2={55} w={10} />
          <Bar x1={45} y1={50} x2={155} y2={50} w={6} />
          <Leg x1={90} y1={110} x2={90} y2={150} w={14} />
          <Leg x1={110} y1={110} x2={110} y2={150} w={14} />
          <Foot cx={90} cy={150} rx={12} ry={5} />
          <Foot cx={110} cy={150} rx={12} ry={5} />
          <Arrow x1={50} y1={40} x2={50} y2={70} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>DISLOCATES</text>
        </g>
      );

    // ===================== EQUILÍBRIO =====================
    case 'bosu-squat-001':
      return (
        <g>
          <ellipse cx={100} cy={150} rx={40} ry={12} fill={C.machine} />
          <ellipse cx={100} cy={145} rx={30} ry={8} fill={C.machineDark} />
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={85} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={115} y2={145} w={14} />
          <Foot cx={85} cy={145} rx={12} ry={5} />
          <Foot cx={115} cy={145} rx={12} ry={5} />
          <ellipse cx={100} cy={155} rx={20} ry={4} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="3 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>BOSU SQUAT</text>
        </g>
      );

    case 'single-leg-deadlift-001':
      return (
        <g>
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={100} y2={150} w={14} />
          <Leg x1={100} y1={110} x2={130} y2={90} w={14} />
          <Foot cx={100} cy={150} rx={12} ry={5} />
          <Foot cx={130} cy={90} rx={12} ry={5} />
          <ellipse cx={100} cy={155} rx={20} ry={4} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="3 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>1 PERN. DEADLIFT</text>
        </g>
      );

    case 'copenhagen-plank-001':
      return (
        <g>
          <Bench x={50} y={120} w={100} h={20} />
          <Head cx={70} cy={95} r={12} />
          <Torso x1={70} y1={110} x2={100} y2={110} w={20} />
          <Arm x1={60} y1={115} x2={50} y2={110} w={10} />
          <Arm x1={80} y1={115} x2={90} y2={110} w={10} />
          <Leg x1={100} y1={110} x2={100} y2={120} w={14} />
          <Leg x1={100} y1={110} x2={130} y2={110} w={14} />
          <Foot cx={100} cy={120} rx={12} ry={5} />
          <Foot cx={130} cy={110} rx={12} ry={5} />
          <rect x={45} y={125} width={90} height={5} rx={2} fill={C.green} opacity={0.7} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>COPENHAGEN</text>
        </g>
      );

    case 'balance-board-001':
      return (
        <g>
          <ellipse cx={100} cy={150} rx={35} ry={8} fill={C.machine} />
          <ellipse cx={100} cy={145} rx={20} ry={5} fill={C.machineDark} />
          <Head cx={100} cy={55} r={12} />
          <Torso x1={100} y1={70} x2={100} y2={110} w={22} />
          <Arm x1={85} y1={75} x2={85} y2={110} w={10} />
          <Arm x1={115} y1={75} x2={115} y2={110} w={10} />
          <Leg x1={90} y1={110} x2={85} y2={145} w={14} />
          <Leg x1={110} y1={110} x2={115} y2={145} w={14} />
          <Foot cx={85} cy={145} rx={12} ry={5} />
          <Foot cx={115} cy={145} rx={12} ry={5} />
          <ellipse cx={100} cy={155} rx={15} ry={3} fill="none" stroke={C.green} strokeWidth={2} strokeDasharray="3 2" />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>BALANCE BOARD</text>
        </g>
      );

    default:
      return (
        <g>
          <Head cx={100} cy={80} r={14} />
          <Torso x1={100} y1={95} x2={100} y2={130} w={24} />
          <Arm x1={85} y1={100} x2={70} y2={120} w={10} />
          <Arm x1={115} y1={100} x2={130} y2={120} w={10} />
          <Leg x1={90} y1={130} x2={85} y2={160} w={14} />
          <Leg x1={110} y1={130} x2={115} y2={160} w={14} />
          <Foot cx={85} cy={160} rx={12} ry={5} />
          <Foot cx={115} cy={160} rx={12} ry={5} />
          <text x={100} y={185} textAnchor="middle" fontSize={11} fill={C.text} fontWeight={700}>EXERCÍCIO</text>
        </g>
      );
  }
}
