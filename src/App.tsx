import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardScreen } from './screens/DashboardScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { ExercisesScreen } from './screens/ExercisesScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { DaFitImportScreen } from './screens/DaFitImportScreen';
import './App.css';

function App() {
  return (
    <Router basename="/gymsage">
      <div className="app-container">
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/workout/:division" element={<WorkoutScreen />} />
          <Route path="/exercises" element={<ExercisesScreen />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/dafit" element={<DaFitImportScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
