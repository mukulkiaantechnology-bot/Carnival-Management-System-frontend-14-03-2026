import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const mockUsers = {
  'admin@demo.com': { id: 1, email: 'admin@demo.com', role: 'admin', companyId: 1 },
  'ops@demo.com': { id: 2, email: 'ops@demo.com', role: 'operations', companyId: 1 },
  'ops_manager@demo.com': { id: 7, email: 'ops_manager@demo.com', role: 'operations_manager', companyId: 1 },
  'maint@demo.com': { id: 3, email: 'maint@demo.com', role: 'maintenance_manager', companyId: 1 },
  'ticket@demo.com': { id: 4, email: 'ticket@demo.com', role: 'ticket', companyId: 1 },
  'ticket_manager@demo.com': { id: 8, email: 'ticket_manager@demo.com', role: 'ticket_manager', companyId: 1 },
  'hr@demo.com': { id: 5, email: 'hr@demo.com', role: 'hr', companyId: 1 },
  'emp@demo.com': { id: 6, email: 'emp@demo.com', role: 'staff', companyId: 1 },
  'platform@demo.com': { id: 9, email: 'platform@demo.com', role: 'super_admin', companyId: 0 },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('carnival_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password) => {
    const foundUser = Object.values(mockUsers).find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('carnival_user', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false, error: 'User not found. Try admin@demo.com etc.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('carnival_user');
  };

  const impersonateAsAdmin = () => {
    const adminUser = mockUsers['admin@demo.com'];
    setUser(adminUser);
    localStorage.setItem('carnival_user', JSON.stringify(adminUser));
  };

  const updateUser = (newData) => {
    setUser(prev => {
      const updated = { ...prev, ...newData };
      localStorage.setItem('carnival_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, impersonateAsAdmin, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
