import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Website */}
                <Route path="/" element={<Home />} />

                {/* Private Admin Gateway & Dashboard */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
