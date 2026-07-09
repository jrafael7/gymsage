import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initDatabase } from '../database/schema';
import './DaFitImportScreen.css';

export const DaFitImportScreen: React.FC = () => {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState('');
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState('');

  const parseAndImport = async () => {
    if (!jsonData.trim()) {
      alert('Cole os dados exportados do Da Fit.');
      return;
    }

    setImporting(true);
    try {
      const data = JSON.parse(jsonData);
      const db = await initDatabase();

      let imported = 0;
      if (Array.isArray(data)) {
        for (const item of data) {
          if (item.date && item.type && item.value !== undefined) {
            await db.put('da_fit_metrics', {
              id: item.id || `dafit-${Date.now()}-${imported}`,
              date: item.date,
              type: item.type,
              value: item.value,
              session_id: item.session_id || null,
            });
            imported++;
          }
        }
      }

      setResult(`${imported} registos importados.`);
      alert(`${imported} registos importados.`);
    } catch (error) {
      alert('Formato inválido. Verifique os dados.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="dafit-container">
      <div className="dafit-header">
        <h2 className="dafit-title">Importar Da Fit</h2>
        <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
      </div>

      <div className="instructions">
        <p>1. Abra a app Da Fit no telemóvel</p>
        <p>2. Exporte os dados (se disponível) ou copie manualmente</p>
        <p>3. Cole os dados em formato JSON abaixo</p>
      </div>

      <textarea
        className="json-input"
        rows={10}
        placeholder="Cole aqui os dados JSON do Da Fit..."
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
      />

      <button className="import-button" onClick={parseAndImport} disabled={importing}>
        {importing ? 'A importar...' : 'Importar Dados'}
      </button>

      {result && <div className="result-box">{result}</div>}
    </div>
  );
};