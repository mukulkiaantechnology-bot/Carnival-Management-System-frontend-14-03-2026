import React, { createContext, useContext, useState, useCallback } from 'react';

const TrainingContext = createContext();

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (!context) {
    throw new Error('useTraining must be used within a TrainingProvider');
  }
  return context;
};

const INITIAL_TRAINING_MODULES = [
  { id: 1, title: 'Safety Protocol 101', type: 'Video', duration: '45 mins', assigned: 120, completion: '95%', status: 'Active', description: 'Basic safety procedures for all park staff.' },
  { id: 2, title: 'Customer Service Excellence', type: 'Video', duration: '30 mins', assigned: 45, completion: '80%', status: 'Active', description: 'Handling guest inquiries and complaints professionally.' },
  { id: 3, title: 'Emergency Response Training', type: 'Course', duration: '2 hours', assigned: 120, completion: '60%', status: 'Active', description: 'Crisis management and first-aid protocols.' },
  { id: 4, title: 'Ticket System Operation', type: 'PDF', duration: '20 mins', assigned: 15, completion: '100%', status: 'Active', description: 'Step-by-step guide on using the POS and ticketing kiosks.' },
];

export const TrainingProvider = ({ children }) => {
  const [trainings, setTrainings] = useState(INITIAL_TRAINING_MODULES);

  const addTraining = useCallback((newTraining) => {
    setTrainings(prev => [{
      ...newTraining,
      id: Date.now(),
      assigned: 0,
      completion: '0%',
      status: 'Active'
    }, ...prev]);
  }, []);

  const updateTraining = useCallback((id, updatedData) => {
    setTrainings(prev => prev.map(t => t.id === id ? { ...t, ...updatedData } : t));
  }, []);

  const deleteTraining = useCallback((id) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <TrainingContext.Provider value={{ trainings, addTraining, updateTraining, deleteTraining }}>
      {children}
    </TrainingContext.Provider>
  );
};
