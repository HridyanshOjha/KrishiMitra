import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Sun, Moon, Bell, ChevronDown, LogOut, UserCircle, Settings } from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'
import { useAuth } from '@/hooks/useAuth'


const PAGE_TITLES = {
  '/dashboard':         { title: 'Dashboard',           subtitle: 'Overview & quick stats' },
  '/dashboard/farmers': { title: 'Farmer Management',   subtitle: 'Manage registered farmers' },
  '/dashboard/land':    { title: 'Land Records',         subtitle: 'Track land parcels & ownership' },
  '/dashboard/schemes': { title: 'Beneficiary Schemes',  subtitle: 'Government scheme enrollment' },
  '/dashboard/reports': { title: 'Reports & Analytics',  subtitle: 'Data insights at a glance' },
}

export default function TopBar({ onMenuClick }) {
  const { dark, toggleDark } = useDarkMode()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const meta = PAGE_TITLES[pathname] || PAGE_TITLES['/dashboard']
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen]     = useState(false)

  const handleSignOut = () => {
    setProfileOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  const closeAll = () => { setProfileOpen(false); setNotifOpen(false) }

  return (
    <header className="h-[60px] flex-shrink-0 flex items-center gap-4 px-4 md:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 relative z-30">
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="lg:hidden p-2 rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
      >
        <Menu size={18} />
      </button>

      <div className="flex-1 min-w-0">
        <h1 className="font-bold text-sm text-stone-800 dark:text-stone-100 leading-tight truncate">{meta.title}</h1>
        <p className="text-[11px] text-stone-400 dark:text-stone-500 hidden sm:block">{meta.subtitle}</p>
      </div>

      <div className="flex items-center gap-1">
        <button onClick={toggleDark} aria-label="Toggle dark mode"
          className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <div className="relative">
          <button onClick={() => { setNotifOpen(n => !n); setProfileOpen(false) }} aria-label="Notifications"
            className="relative p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-72 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-medium py-2 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                <p className="text-xs font-bold text-stone-700 dark:text-stone-300">Notifications</p>
              </div>
              {[
                { text: '3 farmers enrolled in PM-KISAN today',   time: '2h ago', dot: 'bg-brand-500' },
                { text: 'PKVY scheme deadline is in 30 days',     time: '4h ago', dot: 'bg-amber-500' },
                { text: 'Land record LR-009 marked Under Survey', time: '1d ago', dot: 'bg-blue-500'  },
                { text: 'New farmer Simranjit Sekhon registered', time: '2d ago', dot: 'bg-brand-500' },
              ].map((n, i) => (
                <button key={i} onClick={closeAll}
                  className="w-full text-left flex gap-3 px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${n.dot}`} />
                  <div>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug">{n.text}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{n.time}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-bold text-brand-700 dark:text-brand-400">{user?.initials || 'AD'}</span>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 leading-tight">{user?.name || 'Admin'}</div>
              <div className="text-[10px] text-stone-400 dark:text-stone-500">{user?.role}</div>
            </div>
            <ChevronDown size={13} className="hidden sm:block text-stone-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-medium py-1 z-50 animate-fade-in">
              <div className="px-4 py-3 border-b border-stone-100 dark:border-stone-800">
                <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{user?.name}</p>
                <p className="text-xs text-stone-400">{user?.role} · {user?.username}</p>
              </div>
              <button onClick={closeAll}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                <UserCircle size={15} /> My Profile
              </button>
              <button onClick={closeAll}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                <Settings size={15} /> Settings
              </button>
              <div className="border-t border-stone-100 dark:border-stone-800 my-1" />
              <button onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors font-medium">
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {(profileOpen || notifOpen) && (
        <div className="fixed inset-0 z-20" onClick={closeAll} />
      )}
    </header>
  )
}
