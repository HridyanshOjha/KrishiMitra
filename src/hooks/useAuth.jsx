import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

// Demo credentials — in a real app these come from a backend
const DEMO_USERS = [
  { username: 'admin',   password: 'Admin@1234',  role: 'Admin',         name: 'Admin Officer',   initials: 'AO' },
  { username: 'officer', password: 'Officer@123', role: 'Field Officer',  name: 'Field Officer',   initials: 'FO' },
  { username: 'viewer',  password: 'Viewer@123',  role: 'Viewer',         name: 'Data Viewer',     initials: 'DV' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('km_session')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback((username, password) => {
    const found = DEMO_USERS.find(
      u => u.username === username.trim().toLowerCase() && u.password === password
    )
    if (!found) return { ok: false, error: 'Invalid username or password.' }
    const session = { username: found.username, role: found.role, name: found.name, initials: found.initials }
    sessionStorage.setItem('km_session', JSON.stringify(session))
    setUser(session)
    return { ok: true }
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('km_session')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
