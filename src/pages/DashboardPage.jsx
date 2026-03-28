import { Users, Map, Gift, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '@/components/dashboard/StatCard'
import { RegistrationsChart, CropDistributionChart, SchemeEnrollmentChart } from '@/components/dashboard/DashboardCharts'
import { FARMERS } from '@/data/farmers'
import { LAND_RECORDS } from '@/data/land'
import { SCHEMES } from '@/data/schemes'
import Badge from '@/components/ui/Badge'
import { getInitials } from '@/utils/helpers'

const recentActivity = [
  { type: 'farmer',  text: 'New farmer Simranjit Sekhon registered', time: '2 hours ago',  color: 'green' },
  { type: 'land',    text: 'Land record LR-009 updated — Under Survey', time: '4 hours ago', color: 'amber' },
  { type: 'scheme',  text: '3 farmers enrolled in PM-KISAN today',     time: '6 hours ago', color: 'blue'  },
  { type: 'farmer',  text: 'Paramjit Brar status changed to Pending',  time: '1 day ago',   color: 'amber' },
  { type: 'scheme',  text: 'PKVY scheme deadline updated to Nov 30',   time: '2 days ago',  color: 'red'   },
]

export default function DashboardPage() {
  const activeFarmers  = FARMERS.filter(f => f.status === 'Active').length
  const totalLandArea  = LAND_RECORDS.reduce((s, r) => s + r.area, 0).toFixed(1)
  const activeSchemes  = SCHEMES.filter(s => s.status === 'Active').length
  const closingSoon    = SCHEMES.filter(s => s.status === 'Closing Soon').length
  const irrigatedCount = LAND_RECORDS.filter(r => r.irrigated).length

  return (
    <div className="space-y-6 animate-fade-in">

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Registered Farmers"
          value={FARMERS.length}
          icon={Users}
          color="green"
          trend={12}
          trendLabel="vs last month"
        />
        <StatCard
          label="Total Land Area"
          value={`${totalLandArea} ac`}
          icon={Map}
          color="amber"
          trend={5}
          trendLabel="new parcels added"
        />
        <StatCard
          label="Active Schemes"
          value={activeSchemes}
          icon={Gift}
          color="blue"
          trend={0}
          trendLabel="no change"
        />
        <StatCard
          label="Active Farmers"
          value={activeFarmers}
          icon={TrendingUp}
          color="purple"
          trend={8}
          trendLabel="vs last month"
        />
      </div>

      {/* ── QUICK INFO STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Irrigated Land', value: `${irrigatedCount}/${LAND_RECORDS.length}`, sub: 'parcels',         color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-950/30'   },
          { label: 'Pending Farmers', value: FARMERS.filter(f => f.status === 'Pending').length, sub: 'awaiting approval', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30' },
          { label: 'Closing Soon', value: closingSoon, sub: 'schemes',             color: 'text-red-600 dark:text-red-400',     bg: 'bg-red-50 dark:bg-red-950/30'     },
          { label: 'Fallow Land', value: LAND_RECORDS.filter(r => r.status === 'Fallow').length, sub: 'parcels',         color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800'   },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl px-4 py-3`}>
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs font-semibold text-stone-600 dark:text-stone-400">{label}</div>
            <div className="text-[11px] text-stone-400 dark:text-stone-500">{sub}</div>
          </div>
        ))}
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Registration Trend</h3>
              <p className="text-xs text-stone-400 dark:text-stone-500">Farmers & land records over 8 months</p>
            </div>
          </div>
          <RegistrationsChart />
        </div>

        {/* Pie chart */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
          <div className="mb-4">
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Crop Distribution</h3>
            <p className="text-xs text-stone-400 dark:text-stone-500">Share by cultivation area</p>
          </div>
          <CropDistributionChart />
        </div>
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Scheme enrollment bar chart */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
          <div className="mb-4">
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Scheme Enrollment</h3>
            <p className="text-xs text-stone-400 dark:text-stone-500">Farmers enrolled per scheme</p>
          </div>
          <SchemeEnrollmentChart />
        </div>

        {/* Recent farmers */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Recent Farmers</h3>
            <Link to="/dashboard/farmers" className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            {FARMERS.slice(0, 5).map(f => (
              <div key={f.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400">{getInitials(f.name)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">{f.name}</div>
                  <div className="text-[11px] text-stone-400">{f.village} · {f.landArea} ac</div>
                </div>
                <Badge variant={f.status === 'Active' ? 'green' : f.status === 'Pending' ? 'amber' : 'red'} dot>
                  {f.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
          <div className="mb-4">
            <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Recent Activity</h3>
            <p className="text-xs text-stone-400 dark:text-stone-500">Latest updates across the system</p>
          </div>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                  a.color === 'green' ? 'bg-brand-500' :
                  a.color === 'amber' ? 'bg-amber-500' :
                  a.color === 'red'   ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">{a.text}</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
