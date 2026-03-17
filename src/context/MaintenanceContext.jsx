import React, { createContext, useContext, useState, useCallback } from 'react';

const MaintenanceContext = createContext();

export const useMaintenance = () => {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
};

const INITIAL_WORK_ORDERS = [
  { 
    id: 1, 
    idStr: 'WO-001',
    equipment: 'Ferris Wheel', 
    issue: 'Squeaking Sound', 
    assigned: 'Sam Technic', 
    status: 'In Progress', 
    lastService: '2026-02-10', 
    priority: 'High', 
    description: 'Oiling needed for main axle bearings.',
    details: 'The main drive assembly is making rhythmic squeaking noises during rotation. Oiling the primary axle bearings is necessary to prevent friction-related wear.',
    updates: [
      { date: '2026-02-10', text: 'Technician arrived on site. Initial assessment completed.' },
      { date: '2026-02-11', text: 'Lubricant ordered. Waiting for delivery.' }
    ]
  },
  { 
    id: 2, 
    idStr: 'WO-002',
    equipment: 'Bumper Cars', 
    issue: 'Steering Loose', 
    assigned: 'Will Fixit', 
    status: 'Pending', 
    lastService: '2026-03-01', 
    priority: 'Medium', 
    description: 'Cable tension adjustment required on Unit 04.',
    details: 'Unit 04 has reported steering lag. Cable tension within the steering column needs to be adjusted and calibrated.',
    updates: []
  },
  { 
    id: 3, 
    idStr: 'WO-003',
    equipment: 'Roller Coaster', 
    issue: 'Routine Check', 
    assigned: 'Alex Wright', 
    status: 'Completed', 
    lastService: '2026-03-12', 
    priority: 'Normal', 
    description: 'Weekly structural and brake system audit.',
    details: 'Full weekly audit of structural integrity and brake system. All tests passed compliance standards.',
    updates: [
      { date: '2026-03-12', text: 'Audit completed. No issues found.' }
    ]
  },
  { 
    id: 4, 
    idStr: 'WO-004',
    equipment: 'Generator A', 
    issue: 'Oil Leak', 
    assigned: 'Sam Technic', 
    status: 'In Progress', 
    lastService: '2026-01-20', 
    priority: 'Critical', 
    description: 'Primary seal failure detected during load test.',
    details: 'Oil leakage at the primary seal. This unit is critical for the park backup power. Immediate seal replacement is required.',
    updates: []
  },
  { 
    id: 5, 
    idStr: 'WO-005',
    equipment: 'Ticket Booth 2', 
    issue: 'Lock Jammed', 
    assigned: 'Jane Door', 
    status: 'Completed', 
    lastService: '2026-03-14', 
    priority: 'Low', 
    description: 'Replacing smart lock battery and re-aligning strike plate.',
    details: 'The smart lock on booth 2 was intermittently failing. Battery was replaced and the strike plate re-aligned.',
    updates: []
  },
];

const INITIAL_EQUIPMENT = [
  { name: 'Ferris Wheel', status: 'Operational', health: 85, lastService: '2026-02-10' },
  { name: 'Bumper Cars', status: 'Warning', health: 45, lastService: '2026-03-01' },
  { name: 'Roller Coaster', status: 'Operational', health: 98, lastService: '2026-03-12' },
  { name: 'Generator A', status: 'Critical', health: 20, lastService: '2026-01-20' },
  { name: 'Carousel', status: 'Operational', health: 92, lastService: '2026-02-15' },
];

export const MaintenanceProvider = ({ children }) => {
  const [workOrders, setWorkOrders] = useState(INITIAL_WORK_ORDERS);
  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT);

  const addWorkOrder = useCallback((order) => {
    setWorkOrders(prev => [order, ...prev]);
  }, []);

  const updateWorkOrder = useCallback((id, updatedData) => {
    setWorkOrders(prev => prev.map(wo => wo.id === id ? { ...wo, ...updatedData } : wo));
  }, []);

  const getWorkOrderById = useCallback((id) => {
    return workOrders.find(wo => String(wo.id) === String(id));
  }, [workOrders]);

  return (
    <MaintenanceContext.Provider value={{ workOrders, equipmentList, addWorkOrder, updateWorkOrder, getWorkOrderById }}>
      {children}
    </MaintenanceContext.Provider>
  );
};
