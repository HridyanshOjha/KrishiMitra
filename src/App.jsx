import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { DarkModeContext } from '@/hooks/useDarkMode'
import { AuthProvider } from '@/hooks/useAuth'
import RequireAuth from '@/components/layout/RequireAuth'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardPage from '@/pages/DashboardPage'
import FarmersPage from '@/pages/FarmersPage'
import LandPage from '@/pages/LandPage'
import SchemesPage from '@/pages/SchemesPage'
import ReportsPage from '@/pages/ReportsPage'

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('krishimitra-dark')
      return saved ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('krishimitra-dark', JSON.stringify(dark))
    } catch { /* quota exceeded or private mode — silently ignore */ }
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  const toggleDark = () => setDark(d => !d)

  return (
    <DarkModeContext.Provider value={{ dark, toggleDark }}>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected dashboard — redirects to /login if not signed in */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="farmers" element={<FarmersPage />} />
            <Route path="land" element={<LandPage />} />
            <Route path="schemes" element={<SchemesPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </DarkModeContext.Provider>
  )
}
