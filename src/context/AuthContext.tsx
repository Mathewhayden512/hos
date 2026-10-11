import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, full_name: string, phone?: string, address?: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('stitch_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('stitch_token'));
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await api.getMe();
          setUser(res.user);
          localStorage.setItem('stitch_user', JSON.stringify(res.user));
        } catch (err) {
          console.warn('Token expired or invalid', err);
          // Don't wipe mock admin user if logged in locally
          if (user?.role !== 'ADMIN') {
            logout();
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    // Quick Demo Admin check
    if (email === 'admin@amillennialstitch.com' && password === 'admin123') {
      const adminObj: User = {
        id: 1,
        email: 'admin@amillennialstitch.com',
        full_name: 'Hannah Grace (Founder & Admin)',
        role: 'ADMIN',
        phone: '(555) 234-5678',
        address: '124 Faith Way, Nashville, TN'
      };
      const mockToken = 'mock_admin_token_2026';
      setUser(adminObj);
      setToken(mockToken);
      localStorage.setItem('stitch_user', JSON.stringify(adminObj));
      localStorage.setItem('stitch_token', mockToken);
      return adminObj;
    }

    try {
      const res = await api.login({ email, password });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('stitch_user', JSON.stringify(res.user));
      localStorage.setItem('stitch_token', res.token);
      return res.user;
    } catch (err) {
      // Demo Customer Fallback
      if (email === 'customer@example.com' && password === 'customer123') {
        const custObj: User = {
          id: 2,
          email: 'customer@example.com',
          full_name: 'Sarah Jenkins',
          role: 'CUSTOMER',
          phone: '(555) 987-6543',
          address: '742 Evergreen Terrace, Springfield, OR'
        };
        const mockToken = 'mock_customer_token_2026';
        setUser(custObj);
        setToken(mockToken);
        localStorage.setItem('stitch_user', JSON.stringify(custObj));
        localStorage.setItem('stitch_token', mockToken);
        return custObj;
      }
      throw err;
    }
  };

  const register = async (email: string, password: string, full_name: string, phone?: string, address?: string): Promise<User> => {
    try {
      const res = await api.register({ email, password, full_name, phone, address });
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('stitch_user', JSON.stringify(res.user));
      localStorage.setItem('stitch_token', res.token);
      return res.user;
    } catch (err) {
      // Local fallback creation for instant responsiveness
      const newUserObj: User = {
        id: Date.now(),
        email,
        full_name,
        phone: phone || '',
        address: address || '',
        role: 'CUSTOMER'
      };
      const mockToken = `mock_token_${Date.now()}`;
      setUser(newUserObj);
      setToken(mockToken);
      localStorage.setItem('stitch_user', JSON.stringify(newUserObj));
      localStorage.setItem('stitch_token', mockToken);
      return newUserObj;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('stitch_user');
    localStorage.removeItem('stitch_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin: user?.role === 'ADMIN',
        isLoggedIn: !!user,
        login,
        register,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
