import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Leaf, Eye, EyeOff, LogIn, AlertCircle, Info } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Sun, Moon } from 'lucide-react'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { dark, toggleDark } = useDarkMode()

  const from = location.state?.from?.pathname || '/dashboard'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Please enter both username and password.')
      return
    }
    setError('')
    setLoading(true)
    // Simulate slight network delay for realism
    await new Promise(r => setTimeout(r, 400))
    const result = login(username, password)
    setLoading(false)
    if (result.ok) {
      navigate(from, { replace: true })
    } else {
      setError(result.error)
    }
  }

  const fillDemo = (u, p) => { setUsername(u); setPassword(p); setError('') }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <span className="font-bold text-stone-900 dark:text-stone-100">KrishiMitra</span>
        </Link>
        <button
          onClick={toggleDark}
          className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </nav>

      {/* Center card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-600 items-center justify-center mb-4">
              <Leaf size={26} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100">Welcome back</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-1.5 text-sm">
              Sign in to the KrishiMitra Agricultural Portal
            </p>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 mb-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Username */}
              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoComplete="username"
                  placeholder="e.g. admin"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    placeholder="Your password"
                    className="w-full pl-4 pr-11 py-2.5 text-sm rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                    tabIndex={-1}
                  >
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-150 active:scale-[0.99]"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <LogIn size={16} />
                )}
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-blue-700 dark:text-blue-400">
              <Info size={14} />
              Demo Credentials — click to fill
            </div>
            <div className="space-y-2">
              {[
                { label: 'Admin',        u: 'admin',   p: 'Admin@1234',  role: 'Full access' },
                { label: 'Field Officer', u: 'officer', p: 'Officer@123', role: 'Add / Edit only' },
                { label: 'Viewer',       u: 'viewer',  p: 'Viewer@123',  role: 'Read only' },
              ].map(({ label, u, p, role }) => (
                <button
                  key={u}
                  onClick={() => fillDemo(u, p)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-stone-800 border border-blue-100 dark:border-blue-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors text-left"
                >
                  <div>
                    <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{label}</span>
                    <span className="text-[11px] text-stone-400 dark:text-stone-500 ml-2">{u} / {p}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full">
                    {role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-stone-400 dark:text-stone-500 mt-6">
            © {new Date().getFullYear()} KrishiMitra · Department of Agriculture, Punjab
          </p>
        </div>
      </div>
    </div>
  )
}
