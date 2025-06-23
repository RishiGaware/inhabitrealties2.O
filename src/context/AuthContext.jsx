import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/auth/AuthService';
import { setApiLogoutHandler } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // stores { token, message, data }
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setApiLogoutHandler(logout);
    const token = authService.getToken();
    if (token) {
      // In a real app, you'd verify the token with the backend and get user info
      // For now, we'll assume the token is valid if it exists.
      // You would also decode the token to get user info if it's a JWT.
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);
      setAuth(data); // store the full response
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setAuth(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
