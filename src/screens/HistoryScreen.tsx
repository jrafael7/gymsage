import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkoutStore } from '../stores/workoutStore';
import { WorkoutSession } from '../models/types';
import './HistoryScreen.css';

export const HistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { getSessions } = useWorkoutStore();
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="history-container">
      <div className="history-header">
        <h2 className="history-title">Histórico de Treinos</h2>
        <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
      </div>

      <div className="summary-row">
        <div className="summary-box">
          <div className="summary-value">{sessions.length}</div>
          <div className="summary-label">Total</div>
        </div>
        <div className="summary-box">
          <div className="summary-value">{sessions.filter((s) => s.lumbarComplaint).length}</div>
          <div className="summary-label">Lombar</div>
        </div>
        <div className="summary-box">
          <div className="summary-value">
            {sessions.length > 0
              ? (sessions.reduce((acc, s) => acc + s.feeling, 0) / sessions.length).toFixed(1)
              : '-'}
          </div>
          <div className="summary-label">Média</div>
        </div>
      </div>

      <div className="sessions-list">
        {sessions.length === 0 && (
          <div className="empty-text">Nenhum treino registado ainda.</div>
        )}
        {sessions.map((item) => (
          <div
            key={item.id}
            className={`session-item ${item.lumbarComplaint ? 'warning' : ''} ${selectedSession?.id === item.id ? 'selected' : ''}`}
            onClick={() => setSelectedSession(selectedSession?.id === item.id ? null : item)}
          >
            <div className="session-row">
              <span className="session-date">{formatDate(item.date)}</span>
              <span className="session-division">{item.division.toUpperCase()}</span>
            </div>
            <div className="session-row">
              <span className="session-meta">{formatDuration(item.duration)} | Sensação: {item.feeling}/5</span>
              {item.lumbarComplaint && <span className="lumbar-badge">⚠ Lombar</span>}
            </div>
            {selectedSession?.id === item.id && (
              <div className="session-detail">
                <div><strong>Notas:</strong> {item.notes || 'Sem notas'}</div>
                <div><strong>Concluído:</strong> {item.completed ? 'Sim' : 'Não'}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};