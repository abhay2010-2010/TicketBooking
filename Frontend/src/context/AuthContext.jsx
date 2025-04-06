import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, config);
        
        if (res.data.success) {
          setUser(res.data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
      });
  
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        const userData = await fetchUserProfile(res.data.token);
        return userData; // Return the user data which includes the role
      }
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };
  

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        name,
        email,
        password
      });
  
      if (res.data.success) {
        return true; // Just return success, don't log in the user automatically
      }
    } catch (error) {
      throw error.response?.data?.error || 'Registration failed';
    }
  };
  

  const fetchUserProfile = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, config);
      
      if (res.data.success) {
        setUser(res.data.data);
        setIsAuthenticated(true);
        return res.data.data;
      }
    } catch (error) {
      logout();
      throw error;
    }
  };

  const logout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};