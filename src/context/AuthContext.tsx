import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hayyan_admin_token') || sessionStorage.getItem('hayyan_admin_token');
    }
    return null;
  });
  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hayyan_admin_user') || sessionStorage.getItem('hayyan_admin_user');
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/admin/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.valid) {
          setUsername(data.username || 'hyyan55');
          localStorage.setItem('hayyan_admin_user', data.username || 'hyyan55');
          sessionStorage.setItem('hayyan_admin_user', data.username || 'hyyan55');
        } else {
          // Token expired or invalid
          setToken(null);
          setUsername(null);
          localStorage.removeItem('hayyan_admin_token');
          localStorage.removeItem('hayyan_admin_user');
          sessionStorage.removeItem('hayyan_admin_token');
          sessionStorage.removeItem('hayyan_admin_user');
        }
      } catch (err) {
        console.error('Auth verification error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [token]);

  const login = async (user: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, password: pass })
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        setToken(data.token);
        setUsername(data.username || user);
        localStorage.setItem('hayyan_admin_token', data.token);
        localStorage.setItem('hayyan_admin_user', data.username || user);
        sessionStorage.setItem('hayyan_admin_token', data.token);
        sessionStorage.setItem('hayyan_admin_user', data.username || user);
        return { success: true, message: data.message };
      }

      return { success: false, message: data.error || 'Invalid credentials' };
    } catch (err: any) {
      return { success: false, message: 'Server connection error. Please try again.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('hayyan_admin_token');
    localStorage.removeItem('hayyan_admin_user');
    sessionStorage.removeItem('hayyan_admin_token');
    sessionStorage.removeItem('hayyan_admin_user');
    window.location.href = '/admin/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        isLoading,
        username,
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
