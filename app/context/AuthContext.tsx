'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService } from '../lib/authService';

interface AuthContextType {
  authToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  const login = async (email: string, password: string) => {
    const response = await loginService(email, password);
    setAuthToken(response.auth_token);
    localStorage.setItem('authToken', response.auth_token);
    router.push('/');
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
