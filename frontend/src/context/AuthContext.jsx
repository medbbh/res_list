import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial state for user
  const [loading, setLoading] = useState(true); // To show loading until auth is verified

  useEffect(() => {
    const token = localStorage.getItem('token');

    // If token exists in localStorage
    if (token) {
      // Set the Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data using the token
      api.get('/auth/users/me/')
        .then(response => {
          setUser(response.data); // Set the user if the token is valid
          setLoading(false); // Stop the loading
          localStorage.setItem('user', JSON.stringify(response.data)); // Store user in localStorage
        })
        .catch(() => {
          logout(); // If token is invalid or expired, log out the user
        });
    } else {
      setLoading(false); // Stop loading if no token exists
    }
  }, []);

  const login = async (username, password) => {
    try {
      // Call the API to get the token
      const response = await api.post('/auth/jwt/create/', { username, password });
      const { access } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', access);
      
      // Set the Authorization header with the new token
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      // Fetch user data with the token
      const userResponse = await api.get('/auth/users/me/');
      setUser(userResponse.data);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(userResponse.data));
    } catch (error) {
      console.error('Login error:', error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Reset user state and headers
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
