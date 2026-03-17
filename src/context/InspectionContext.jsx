import React, { createContext, useContext, useState, useCallback } from 'react';

const InspectionContext = createContext();

export const useInspections = () => {
  const context = useContext(InspectionContext);
  if (!context) {
    throw new Error('useInspections must be used within an InspectionProvider');
  }
  return context;
};

const INITIAL_REPORTS = [
  { 
    id: 'INS-001', 
    type: 'Ride Safety', 
    status: 'Completed', 
    date: '2026-03-14', 
    inspector: 'John Doe', 
    details: 'All rides passed safety checks. No issues found.', 
    results: { 'Structure integrity': 'Pass', 'Control panel function': 'Pass', 'Emergency stop test': 'Pass', 'Seatbelt condition': 'Pass' },
    finalResult: 'Pass',
    photos: [
      'https://images.unsplash.com/photo-1513889959011-06a25b6564ad?w=800&q=80',
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&q=80'
    ]
  },
  { 
    id: 'INS-002', 
    type: 'Food Health', 
    status: 'In Progress', 
    date: '2026-03-14', 
    inspector: 'Jane Smith', 
    details: 'Kitchen inspection ongoing. Sanitization checked.', 
    results: {},
    finalResult: 'Pending',
    photos: []
  },
  { 
    id: 'INS-003', 
    type: 'Electrical', 
    status: 'Pending', 
    date: '2026-03-13', 
    inspector: 'Mike Johnson', 
    details: 'Waiting for maintenance lead approval.', 
    results: {},
    finalResult: 'Pending',
    photos: []
  },
  { 
    id: 'INS-004', 
    type: 'Sanitation', 
    status: 'Completed', 
    date: '2026-03-12', 
    inspector: 'Sarah Wilson', 
    details: 'Restrooms and public areas inspected.', 
    results: { 'Floor cleanliness': 'Pass', 'Supply stock': 'Pass', 'Water function': 'Pass' },
    finalResult: 'Pass',
    photos: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80'
    ]
  },
];

const INITIAL_TEMPLATES = [
  { name: 'Daily Ride Check', category: 'Operations', questions: ['Structure integrity', 'Control panel function', 'Emergency stop test', 'Seatbelt condition'] },
  { name: 'Food Stall Safety', category: 'Health', questions: ['Temperature logs', 'Staff hygiene', 'Storage labeling', 'Fire extinguisher check'] },
  { name: 'Night Shift Security', category: 'Security', questions: ['Perimeter check', 'Light function', 'Gate locks', 'Surveillance status'] },
  { name: 'Electrical Panel Audit', category: 'Maintenance', questions: ['Breakers check', 'Grounding test', 'Labeling update', 'Load balance'] },
];

export const InspectionProvider = ({ children }) => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);

  const addReport = useCallback((report) => {
    setReports(prev => [report, ...prev]);
  }, []);

  const addTemplate = useCallback((template) => {
    setTemplates(prev => [...prev, template]);
  }, []);

  const getReportById = useCallback((id) => {
    return reports.find(r => r.id === id);
  }, [reports]);

  return (
    <InspectionContext.Provider value={{ reports, templates, addReport, addTemplate, getReportById }}>
      {children}
    </InspectionContext.Provider>
  );
};
