// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userId, token, role) => {
    setUserId(userId);
    setToken(token);
    setRole(role);
    localStorage.setItem('userId', userId);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  useEffect(() => {
    // Attempt to retrieve the token, userId, and role from localStorage on component mount
    const storedUserId = localStorage.getItem('userId');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUserId && storedToken && storedRole) {
      setUserId(storedUserId);
      setToken(storedToken);
      setRole(storedRole);
    }
  }, [userId,token,role]);

  return (
    <AuthContext.Provider value={{ userId, login, logout, token, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { userId, login, logout, token, role } = context;

  const isAuthenticated = () => !!token;

  return { userId, login, logout, isAuthenticated, token, role };
};
