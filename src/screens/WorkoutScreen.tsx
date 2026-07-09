import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../stores/workoutStore';
import { useExerciseStore } from '../stores/exerciseStore';
import { useImageStore } from '../stores/imageStore';
import { DivisionName, Exercise, WorkoutSet } from '../models/types';
import { ExerciseIcon } from '../components/ExerciseIcon';
import './WorkoutScreen.css';

export const WorkoutScreen: React.FC = () => {
  const { division } = useParams<{ division: string }>();
  const navigate = useNavigate();
  const { exercises, getSubstitutions } = useExerciseStore();
  const { images, loadImages } = useImageStore();
  const { startWorkout, addSet, completeSet, endWorkout, activeSession } = useWorkoutStore();

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [reps, setReps] = useState(12);
  const [weight, setWeight] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [completedSets, setCompletedSets] = useState<WorkoutSet[]>([]);
  const [lumbarComplaint, setLumbarComplaint] = useState(false);
  const [feeling, setFeeling] = useState(3);
  const [notes, setNotes] = useState('');
  const [exerciseList, setExerciseList] = useState<Exercise[]>([]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    const init = async () => {
      await startWorkout(division as DivisionName, 'custom');
      setIsActive(true);
      startTimeRef.current = new Date();

      const selectedExercises = selectExercisesForDivision(division as DivisionName, exercises);
      setExerciseList(selectedExercises);
    };
    init();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [division]);

  useEffect(() => {
    if (isResting && restTimer > 0) {
      timerRef.current = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isResting, restTimer]);

  const selectExercisesForDivision = (div: DivisionName, allExercises: Exercise[]): Exercise[] => {
    const divisionMap: Record<DivisionName, string[]> = {
      'pernas': ['leg-press-001', 'extensao-pernas-001', 'flexao-pernas-001', 'adutores-001', 'abducoes-001', 'panturrilha-001'],
      'costas': ['puxada-frontal-001', 'remada-sentada-001', 'face-pull-001', 'hyperextension-001', 'pullover-001'],
      'peito': ['peito-maquina-001', 'peito-inclinado-001', 'crossover-001', 'peck-deck-001', 'flexoes-001'],
      'braços': ['rosca-biceps-001', 'rosca-haltere-001', 'triceps-corda-001', 'triceps-maquina-001', 'rosca-martelo-001', 'triceps-frances-001'],
      'full-body': ['leg-press-001', 'puxada-frontal-001', 'peito-maquina-001', 'prancha-001', 'panturrilha-001', 'rosca-biceps-001'],
      'core/lombar': ['hyperextension-001', 'bridge-001', 'bird-dog-001', 'dead-bug-001', 'vacuo-abdominal-001', 'prancha-001', 'prancha-lateral-001', 'pallof-press-001'],
      'mobilidade/recuperação': ['rotacao-quadril-001', 'abertura-tornozelo-001', 'thoracic-rotation-001', 'cat-cow-001', '9090-hip-001', 'single-leg-balance-001', 'mobilidade-ombros-001'],
    };

    const ids = divisionMap[div] || [];
    return ids
      .map((id) => allExercises.find((e) => e.id === id))
      .filter((e): e is Exercise => e !== undefined);
  };

  const currentExercise = exerciseList[currentExerciseIndex];

  const completeCurrentSet = async () => {
    if (!currentExercise || !activeSession) return;

    const setId = `set-${Date.now()}`;
    await addSet(currentExercise.id, currentSet, reps, weight, 60);
    await completeSet(setId, reps, weight, 60);

    setCompletedSets((prev) => [
      ...prev,
      { id: setId, sessionId: activeSession.id, exerciseId: currentExercise.id, setNumber: currentSet, reps, weight, restSeconds: 60, completed: true, notes: '' },
    ]);

    if (currentSet < 4) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestTimer(60);
    } else {
      if (currentExerciseIndex < exerciseList.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setIsResting(true);
        setRestTimer(60);
      } else {
        finishWorkout();
      }
    }
  };

  const finishWorkout = () => {
    if (window.confirm('Treino Concluído. Registar sensação e finalizar?')) {
      endWorkout(notes, feeling, lumbarComplaint);
      navigate('/');
    }
  };

  const reportLumbar = () => {
    setLumbarComplaint(true);
    if (window.confirm('Lombar Reclamou. Substituir exercício atual?')) {
      if (!currentExercise) return;
      const subs = getSubstitutions(currentExercise.id);
      if (subs.length > 0) {
        const newList = [...exerciseList];
        newList[currentExerciseIndex] = subs[0];
        setExerciseList(newList);
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive || !currentExercise) {
    return (
      <div className="workout-container">
        <div className="workout-loading">A iniciar treino...</div>
      </div>
    );
  }

  return (
    <div className="workout-container">
      <div className="workout-header">
        <h2 className="workout-division">{division?.toUpperCase()}</h2>
        <p className="workout-progress">
          Exercício {currentExerciseIndex + 1} de {exerciseList.length} | Série {currentSet} de 4
        </p>
      </div>

      <div className="exercise-card">
        {images[currentExercise.id] ? (
          <img 
            src={images[currentExercise.id]} 
            alt={currentExercise.name}
            className="workout-exercise-image"
          />
        ) : (
          <div className="workout-exercise-icon">
            <ExerciseIcon exercise={currentExercise} size={200} />
          </div>
        )}
        <div className="exercise-card-content">
          <h3 className="exercise-name">{currentExercise.name}</h3>
          <p className="exercise-type">{currentExercise.type} | {currentExercise.muscleGroup}</p>
          <p className="exercise-instructions">{currentExercise.instructions}</p>
          {currentExercise.isLumbarSafe && (
            <div className="safe-badge">✓ Lombar Seguro</div>
          )}
        </div>
      </div>

      {isResting && (
        <div className="timer-box">
          <div className="timer-label">DESCANSO</div>
          <div className="timer-value">{formatTime(restTimer)}</div>
        </div>
      )}

      <div className="set-input">
        <div className="input-row">
          <div className="input-group">
            <label className="input-label">Reps</label>
            <div className="input-controls">
              <button className="input-button" onClick={() => setReps(Math.max(1, reps - 1))}>-</button>
              <span className="input-value">{reps}</span>
              <button className="input-button" onClick={() => setReps(reps + 1)}>+</button>
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Peso (kg)</label>
            <div className="input-controls">
              <button className="input-button" onClick={() => setWeight(Math.max(0, weight - 1))}>-</button>
              <span className="input-value">{weight}</span>
              <button className="input-button" onClick={() => setWeight(weight + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>

      <div className="workout-actions">
        <button
          className="complete-button"
          onClick={completeCurrentSet}
          disabled={isResting}
        >
          {isResting ? 'A DESCANSAR...' : 'COMPLETAR SÉRIE'}
        </button>

        <button className="lumbar-button" onClick={reportLumbar}>
          ⚠ LOMBAR RECLAMOU
        </button>

        <button className="skip-button" onClick={() => {
          if (currentExerciseIndex < exerciseList.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setCurrentSet(1);
          } else {
            finishWorkout();
          }
        }}>
          Saltar Exercício
        </button>
      </div>
    </div>
  );
};