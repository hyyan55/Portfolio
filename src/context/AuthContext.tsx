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
  // SECURITY FIX: Only read token from sessionStorage (active browser tab session).
  // Never automatically authenticate from permanent localStorage.
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      // Proactively clear any legacy persistent tokens from localStorage
      try {
        localStorage.removeItem('hayyan_admin_token');
        localStorage.removeItem('hayyan_admin_user');
      } catch {
        // ignore
      }
      return sessionStorage.getItem('hayyan_admin_token');
    }
    return null;
  });

  const [username, setUsername] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('hayyan_admin_user');
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(true);

  // Clear any persistent localStorage tokens on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('hayyan_admin_token');
        localStorage.removeItem('hayyan_admin_user');
      } catch {
        // ignore
      }
    }
  }, []);

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
          sessionStorage.setItem('hayyan_admin_user', data.username || 'hyyan55');
        } else {
          // Token expired or invalid: immediately clear session
          setToken(null);
          setUsername(null);
          sessionStorage.removeItem('hayyan_admin_token');
          sessionStorage.removeItem('hayyan_admin_user');
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setToken(null);
        setUsername(null);
        sessionStorage.removeItem('hayyan_admin_token');
        sessionStorage.removeItem('hayyan_admin_user');
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
        // Only save in active sessionStorage
        sessionStorage.setItem('hayyan_admin_token', data.token);
        sessionStorage.setItem('hayyan_admin_user', data.username || user);
        // Ensure localStorage is cleared
        try {
          localStorage.removeItem('hayyan_admin_token');
          localStorage.removeItem('hayyan_admin_user');
        } catch {
          // ignore
        }
        return { success: true, message: data.message };
      }

      return { success: false, message: data.error || 'اسم المستخدم أو كلمة المرور غير صحيحة' };
    } catch (err: any) {
      return { success: false, message: 'خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى.' };
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('hayyan_admin_token');
        sessionStorage.removeItem('hayyan_admin_user');
        localStorage.removeItem('hayyan_admin_token');
        localStorage.removeItem('hayyan_admin_user');
      } catch {
        // ignore
      }
    }
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

