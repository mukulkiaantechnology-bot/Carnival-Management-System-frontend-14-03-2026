import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const mockUsers = {
  'admin@demo.com': { id: 1, email: 'admin@demo.com', role: 'admin', companyId: 1 },
  'ops@demo.com': { id: 2, email: 'ops@demo.com', role: 'operations', companyId: 1 },
  'maint@demo.com': { id: 3, email: 'maint@demo.com', role: 'maintenance', companyId: 1 },
  'ticket@demo.com': { id: 4, email: 'ticket@demo.com', role: 'ticket', companyId: 1 },
  'hr@demo.com': { id: 5, email: 'hr@demo.com', role: 'hr', companyId: 1 },
  'emp@demo.com': { id: 6, email: 'emp@demo.com', role: 'employee', companyId: 1 },
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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
