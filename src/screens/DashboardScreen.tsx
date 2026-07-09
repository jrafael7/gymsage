import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExerciseStore } from '../stores/exerciseStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { Suggestion, DivisionName, WorkoutSession } from '../models/types';
import { generateSuggestion, SuggestionContext } from '../services/suggestionEngine';
import { initializeDatabase } from '../services/initService';
import './DashboardScreen.css';

const DIVISIONS: DivisionName[] = [
  'pernas', 'costas', 'peito', 'braços', 'full-body', 'core/lombar', 'mobilidade/recuperação',
];

export const DashboardScreen: React.FC = () => {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSession, setLastSession] = useState<WorkoutSession | null>(null);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [lumbarRecent, setLumbarRecent] = useState(false);

  const navigate = useNavigate();
  const { loadExercises } = useExerciseStore();
  const { getLastSession, getWeeklyFrequency, getLumbarComplaintHistory } = useWorkoutStore();

  useEffect(() => {
    const init = async () => {
      try {
        await initializeDatabase();
        await loadExercises();

        const last = await getLastSession();
        setLastSession(last);

        const weekly = await getWeeklyFrequency();
        setWeeklyCount(weekly);

        const lumbarHistory = await getLumbarComplaintHistory();
        const recentLumbar = lumbarHistory.length > 0 && 
          new Date(lumbarHistory[0].date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
        setLumbarRecent(recentLumbar);

        const context: SuggestionContext = {
          lastSession: last,
          weeklyFrequency: weekly,
          lumbarComplaintRecent: recentLumbar,
          hasSquashTomorrow: false,
          hasSquashToday: false,
          daFitMetrics: {},
        };

        const sugg = await generateSuggestion(context);
        setSuggestion(sugg);
        setLoading(false);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        setLoading(false);
      }
    };
    init();
  }, []);

  const getDivisionLabel = (division: DivisionName): string => {
    const labels: Record<DivisionName, string> = {
      'pernas': 'Pernas',
      'costas': 'Costas',
      'peito': 'Peito',
      'braços': 'Braços',
      'full-body': 'Full Body',
      'core/lombar': 'Core / Lombar',
      'mobilidade/recuperação': 'Mobilidade / Recuperação',
    };
    return labels[division] || division;
  };

  const startWorkout = (division: DivisionName) => {
    navigate(`/workout/${division}`);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">GymSage</h1>
        <p className="dashboard-subtitle">Sistema de manutenção do corpo</p>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <div className="stat-value">{weeklyCount}</div>
          <div className="stat-label">Treinos esta semana</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{lastSession ? getDaysSince(lastSession) : '-'}</div>
          <div className="stat-label">Dias desde último</div>
        </div>
      </div>

      {lumbarRecent && (
        <div className="warning-box">
          <span className="warning-icon">⚠️</span>
          <span className="warning-text">Lombar reclamou recentemente. Priorizar mobilidade e recuperação.</span>
        </div>
      )}

      <div className="suggestion-box">
        <div className="suggestion-label">SUGESTÃO DO DIA</div>
        <div className="suggestion-division">
          {suggestion ? getDivisionLabel(suggestion.division) : 'Full Body'}
        </div>
        <div className="suggestion-reason">
          {suggestion?.reason || 'Iniciar treino.'}
        </div>
        <button
          className="start-button"
          onClick={() => startWorkout(suggestion?.division || 'full-body')}
        >
          Iniciar Treino
        </button>
      </div>

      <div className="section-title">OU ESCOLHER OUTRA DIVISÃO</div>
      <div className="divisions-grid">
        {DIVISIONS.map((division) => (
          <button
            key={division}
            className="division-button"
            onClick={() => startWorkout(division)}
          >
            {getDivisionLabel(division)}
          </button>
        ))}
      </div>

      <div className="footer-nav">
        <button className="footer-button" onClick={() => navigate('/history')}>
          Histórico
        </button>
        <button className="footer-button" onClick={() => navigate('/exercises')}>
          Exercícios
        </button>
        <button className="footer-button" onClick={() => navigate('/settings')}>
          Definições
        </button>
      </div>

      <button className="dafit-button" onClick={() => navigate('/dafit')}>
        Importar Da Fit
      </button>
    </div>
  );
};

function getDaysSince(session: WorkoutSession): number {
  const now = new Date();
  const sessionDate = new Date(session.date);
  const diffMs = now.getTime() - sessionDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
