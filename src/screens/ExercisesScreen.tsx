import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExerciseStore } from '../stores/exerciseStore';
import { useImageStore } from '../stores/imageStore';
import { Exercise } from '../models/types';
import { ExerciseIllustration } from '../components/ExerciseIllustration';
import './ExercisesScreen.css';

export const ExercisesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { exercises, loadExercises, addExercise, deleteExercise } = useExerciseStore();
  const { images, loadImages, saveImage, deleteImage } = useImageStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  
  const [filter, setFilter] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: 'pernas',
    type: 'máquina',
    description: '',
    instructions: '',
    isLumbarSafe: true,
  });

  useEffect(() => {
    loadExercises();
    loadImages();
  }, []);

  const filteredExercises = filter
    ? exercises.filter((e) =>
        e.name.toLowerCase().includes(filter.toLowerCase()) ||
        e.muscleGroup.toLowerCase().includes(filter.toLowerCase())
      )
    : exercises;

  const handleAdd = async () => {
    if (!newExercise.name.trim()) {
      alert('Nome do exercício é obrigatório');
      return;
    }

    const exercise: Exercise = {
      id: `custom-${Date.now()}`,
      name: newExercise.name,
      muscleGroup: newExercise.muscleGroup as any,
      description: newExercise.description,
      isLumbarSafe: newExercise.isLumbarSafe,
      type: newExercise.type as any,
      instructions: newExercise.instructions,
      substitutions: [],
      isCustom: true,
      createdAt: new Date(),
    };

    await addExercise(exercise);
    setShowAdd(false);
    setNewExercise({
      name: '',
      muscleGroup: 'pernas',
      type: 'máquina',
      description: '',
      instructions: '',
      isLumbarSafe: true,
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Eliminar "${name}"?`)) {
      deleteExercise(id);
      deleteImage(id);
    }
  };

  const handleImageUpload = (exerciseId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        saveImage(exerciseId, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = (exerciseId: string) => {
    setSelectedExerciseId(exerciseId);
    fileInputRef.current?.click();
  };

  return (
    <div className="exercises-container">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => {
          if (selectedExerciseId) {
            handleImageUpload(selectedExerciseId, e);
          }
        }}
      />

      <div className="exercises-header">
        <h2 className="exercises-title">Biblioteca de Exercícios</h2>
        <button className="back-button" onClick={() => navigate('/')}>Voltar</button>
      </div>

      <input
        className="exercises-search"
        placeholder="Pesquisar exercícios..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <button className="add-exercise-button" onClick={() => setShowAdd(!showAdd)}>
        {showAdd ? 'Cancelar' : '+ Novo Exercício'}
      </button>

      {showAdd && (
        <div className="add-form">
          <input
            className="form-input"
            placeholder="Nome do exercício"
            value={newExercise.name}
            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
          />
          <div className="form-group">
            <label>Grupo Muscular</label>
            <div className="picker-row">
              {['pernas', 'costas', 'peito', 'ombros', 'braços', 'core', 'mobilidade', 'equilíbrio'].map((g) => (
                <button
                  key={g}
                  className={`picker-item ${newExercise.muscleGroup === g ? 'active' : ''}`}
                  onClick={() => setNewExercise({ ...newExercise, muscleGroup: g })}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <div className="picker-row">
              {['máquina', 'peso livre', 'bodyweight'].map((t) => (
                <button
                  key={t}
                  className={`picker-item ${newExercise.type === t ? 'active' : ''}`}
                  onClick={() => setNewExercise({ ...newExercise, type: t })}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="form-input"
            placeholder="Descrição"
            value={newExercise.description}
            onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
            rows={3}
          />
          <textarea
            className="form-input"
            placeholder="Instruções"
            value={newExercise.instructions}
            onChange={(e) => setNewExercise({ ...newExercise, instructions: e.target.value })}
            rows={3}
          />
          <button
            className={`lumbar-toggle ${newExercise.isLumbarSafe ? 'safe' : 'unsafe'}`}
            onClick={() => setNewExercise({ ...newExercise, isLumbarSafe: !newExercise.isLumbarSafe })}
          >
            {newExercise.isLumbarSafe ? '✓ Lombar Seguro' : '✗ Não Seguro para Lombar'}
          </button>
          <button className="save-button" onClick={handleAdd}>Guardar Exercício</button>
        </div>
      )}

      <div className="exercises-list">
        {filteredExercises.map((item) => {
          const imageData = images[item.id];
          return (
            <div key={item.id} className="exercise-item">
              <div className="exercise-content">
                {imageData ? (
                  <div className="exercise-image-container">
                    <img src={imageData} alt={item.name} className="exercise-image" />
                    <button 
                      className="image-replace-button"
                      onClick={() => triggerImageUpload(item.id)}
                    >
                      Trocar
                    </button>
                  </div>
                ) : (
                  <div className="exercise-icon-wrapper">
                    <ExerciseIllustration exercise={item} size={80} />
                    <button 
                      className="image-replace-button"
                      onClick={() => triggerImageUpload(item.id)}
                    >
                      + Foto
                    </button>
                  </div>
                )}
                <div className="exercise-info">
                  <div className="exercise-name">{item.name}</div>
                  <div className="exercise-meta">
                    {item.muscleGroup} | {item.type}
                    {item.isLumbarSafe && ' | ✓ Lombar Seguro'}
                    {item.isCustom && ' | [Personalizado]'}
                  </div>
                </div>
              </div>
              {item.isCustom && (
                <button className="delete-button" onClick={() => handleDelete(item.id, item.name)}>
                  Eliminar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};