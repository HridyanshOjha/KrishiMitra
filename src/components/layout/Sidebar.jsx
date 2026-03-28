import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Map, Gift, BarChart3,
  Leaf, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { cn } from '@/utils/helpers'

const NAV_ITEMS = [
  { to: '/dashboard',         label: 'Dashboard',  icon: LayoutDashboard, end: true },
  { to: '/dashboard/farmers', label: 'Farmers',    icon: Users },
  { to: '/dashboard/land',    label: 'Land Records', icon: Map },
  { to: '/dashboard/schemes', label: 'Schemes',    icon: Gift },
  { to: '/dashboard/reports', label: 'Reports',    icon: BarChart3 },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed lg:relative z-50 lg:z-auto h-full flex flex-col',
        'bg-white dark:bg-stone-900',
        'border-r border-stone-200 dark:border-stone-800',
        'transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        // mobile
        'lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className={cn(
          'flex items-center gap-3 px-4 py-4 border-b border-stone-200 dark:border-stone-800',
          'flex-shrink-0'
        )}>
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center flex-shrink-0">
            <Leaf size={16} className="text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="font-bold text-sm text-stone-800 dark:text-stone-100 leading-tight">KrishiMitra</div>
              <div className="text-[10px] text-stone-400 dark:text-stone-500 font-medium tracking-wide">AGRI PORTAL</div>
            </div>
          )}
          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="ml-auto lg:hidden p-1 text-stone-400 hover:text-stone-600"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {!collapsed && (
            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-600">
              Navigation
            </p>
          )}
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onMobileClose}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-150 group relative',
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-stone-100'
              )}
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className={cn('flex-shrink-0', isActive ? 'text-brand-600 dark:text-brand-400' : '')} />
                  {!collapsed && <span>{label}</span>}
                  {/* Tooltip on collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-stone-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: collapse toggle (desktop) + version */}
        <div className="flex-shrink-0 border-t border-stone-200 dark:border-stone-800 p-2">
          <button
            onClick={onToggle}
            className="hidden lg:flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-xs font-medium"
          >
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span>Collapse</span>
              </>
            )}
          </button>
          {!collapsed && (
            <p className="text-center text-[10px] text-stone-300 dark:text-stone-700 mt-1">v1.0.0 — Ludhiana, Punjab</p>
          )}
        </div>
      </aside>
    </>
  )
}
