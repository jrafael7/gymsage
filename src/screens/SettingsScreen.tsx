import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initDatabase } from '../database/schema';
import './SettingsScreen.css';

export const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    age: 51,
    weight: 75,
    height: 175,
    preferredRestSeconds: 90,
    enableVibration: true,
    enableSound: false,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const db = await initDatabase();
      const data = await db.get('user_profile', 'user-001');
      if (data) {
        setProfile({
          age: data.age,
          weight: data.weight,
          height: data.height,
          preferredRestSeconds: data.preferred_rest_seconds,
          enableVibration: data.enable_vibration === 1 || data.enable_vibration === true,
          enableSound: data.enable_sound === 1 || data.enable_sound === true,
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      const db = await initDatabase();
      await db.put('user_profile', {
        id: 'user-001',
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        preferred_rest_seconds: profile.preferredRestSeconds,
        enable_vibration: profile.enableVibration ? 1 : 0,
        enable_sound: profile.enableSound ? 1 : 0,
        units: 'metric',
      });
      alert('Definições atualizadas.');
    } catch (error) {
      alert('Não foi possível guardar.');
    }
  };

  const exportData = async () => {
    try {
      const db = await initDatabase();
      const sessions = await db.getAll('workout_sessions');
      const sets = await db.getAll('workout_sets');
      const data = JSON.stringify({ sessions, sets, exportedAt: new Date().toISOString() }, null, 2);
      
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gymsage-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      alert(`${sessions.length} sessões, ${sets.length} séries exportadas.`);
    } catch (error) {
      alert('Não foi possível exportar.');
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2 className="settings-title">Definições</h2>
        <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
      </div>

      <div className="settings-section">
        <h3 className="section-title">PERFIL</h3>
        <div className="input-row">
          <label>Idade</label>
          <input type="number" value={profile.age} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
        </div>
        <div className="input-row">
          <label>Peso (kg)</label>
          <input type="number" value={profile.weight} onChange={(e) => setProfile({ ...profile, weight: Number(e.target.value) })} />
        </div>
        <div className="input-row">
          <label>Altura (cm)</label>
          <input type="number" value={profile.height} onChange={(e) => setProfile({ ...profile, height: Number(e.target.value) })} />
        </div>
      </div>

      <div className="settings-section">
        <h3 className="section-title">TREINO</h3>
        <div className="input-row">
          <label>Descanso padrão (seg)</label>
          <input type="number" value={profile.preferredRestSeconds} onChange={(e) => setProfile({ ...profile, preferredRestSeconds: Number(e.target.value) })} />
        </div>
        <div className="switch-row">
          <label>Vibração</label>
          <input type="checkbox" checked={profile.enableVibration} onChange={(e) => setProfile({ ...profile, enableVibration: e.target.checked })} />
        </div>
        <div className="switch-row">
          <label>Som</label>
          <input type="checkbox" checked={profile.enableSound} onChange={(e) => setProfile({ ...profile, enableSound: e.target.checked })} />
        </div>
      </div>

      <button className="save-button" onClick={saveProfile}>Guardar Definições</button>

      <div className="settings-section">
        <h3 className="section-title">DADOS</h3>
        <button className="action-button" onClick={exportData}>Exportar Dados (JSON)</button>
      </div>

      <div className="settings-footer">
        <div className="footer-title">GymSage v1.0</div>
        <div className="footer-sub">Sistema de manutenção do corpo</div>
      </div>
    </div>
  );
};