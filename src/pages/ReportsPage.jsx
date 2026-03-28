import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Download, FileText } from 'lucide-react'
import Button from '@/components/ui/Button'
import { FARMERS } from '@/data/farmers'
import { LAND_RECORDS } from '@/data/land'
import { SCHEMES } from '@/data/schemes'

// ── Derived data ─────────────────────────────────────────────────────────────

const categoryData = ['Marginal Farmer', 'Small Farmer', 'Medium Farmer', 'Large Farmer'].map(cat => ({
  name: cat.replace(' Farmer', ''),
  count: FARMERS.filter(f => f.category === cat).length,
}))

const villageData = Object.entries(
  FARMERS.reduce((acc, f) => { acc[f.village] = (acc[f.village] || 0) + 1; return acc }, {})
).map(([village, count]) => ({ village, count })).sort((a, b) => b.count - a.count)

const incomeRanges = [
  { range: '< ₹50k',     count: FARMERS.filter(f => f.annualIncome < 50000).length },
  { range: '₹50k–1L',    count: FARMERS.filter(f => f.annualIncome >= 50000 && f.annualIncome < 100000).length },
  { range: '₹1L–1.5L',   count: FARMERS.filter(f => f.annualIncome >= 100000 && f.annualIncome < 150000).length },
  { range: '₹1.5L–2L',   count: FARMERS.filter(f => f.annualIncome >= 150000 && f.annualIncome < 200000).length },
  { range: '> ₹2L',      count: FARMERS.filter(f => f.annualIncome >= 200000).length },
]

const landTypeData = Object.entries(
  LAND_RECORDS.reduce((acc, r) => { acc[r.landType] = (acc[r.landType] || 0) + r.area; return acc }, {})
).map(([type, area]) => ({ type, area: parseFloat(area.toFixed(1)) }))

const soilData = Object.entries(
  LAND_RECORDS.reduce((acc, r) => { acc[r.soilType] = (acc[r.soilType] || 0) + 1; return acc }, {})
).map(([soil, count]) => ({ soil, count }))

const monthlyTrend = [
  { month: 'Aug 23', farmers: 6,  land: 7  },
  { month: 'Sep 23', farmers: 8,  land: 8  },
  { month: 'Oct 23', farmers: 7,  land: 6  },
  { month: 'Nov 23', farmers: 10, land: 11 },
  { month: 'Dec 23', farmers: 9,  land: 9  },
  { month: 'Jan 24', farmers: 11, land: 10 },
  { month: 'Feb 24', farmers: 10, land: 12 },
  { month: 'Mar 24', farmers: 12, land: 10 },
]

const schemeData = SCHEMES.map(s => ({
  name: s.shortName,
  enrolled: s.enrolledFarmers,
  eligible: Math.round(FARMERS.length * (0.4 + Math.random() * 0.5)),
}))

const radarData = [
  { subject: 'Reg. Completeness', A: 88 },
  { subject: 'Land Coverage', A: 76 },
  { subject: 'Scheme Enrollment', A: 62 },
  { subject: 'Data Accuracy', A: 91 },
  { subject: 'Update Frequency', A: 70 },
]

const COLORS = ['#2d8c2d', '#4ab84a', '#9a7740', '#64b5f6', '#ba68c8']

const tooltipStyle = {
  backgroundColor: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
}

// ── Component ─────────────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft p-5">
      <div className="mb-4">
        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">{title}</h3>
        {subtitle && <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default function ReportsPage() {
  const totalArea      = LAND_RECORDS.reduce((s, r) => s + r.area, 0).toFixed(1)
  const irrigatedPct   = Math.round(LAND_RECORDS.filter(r => r.irrigated).length / LAND_RECORDS.length * 100)
  const avgIncome      = Math.round(FARMERS.reduce((s, f) => s + f.annualIncome, 0) / FARMERS.length)
  const totalEnrolled  = SCHEMES.reduce((s, sc) => s + sc.enrolledFarmers, 0)

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Reports & Analytics</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            Ludhiana District — Data as of March 2024
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download size={14} />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <FileText size={14} />
            Full Report
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Avg. Annual Income',    value: `₹${(avgIncome / 1000).toFixed(0)}K`,  color: 'text-brand-600 dark:text-brand-400'  },
          { label: 'Total Mapped Area',     value: `${totalArea} ac`,                     color: 'text-amber-600 dark:text-amber-400'  },
          { label: 'Irrigation Coverage',   value: `${irrigatedPct}%`,                    color: 'text-blue-600 dark:text-blue-400'    },
          { label: 'Total Scheme Benefits', value: `${totalEnrolled} farmers`,             color: 'text-purple-600 dark:text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 shadow-soft">
            <div className={`text-2xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts — row 1 */}
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly Registration Trend" subtitle="New farmers and land records added per month">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Line type="monotone" dataKey="farmers" name="Farmers" stroke="#2d8c2d" strokeWidth={2.5} dot={{ r: 3, fill: '#2d8c2d' }} />
              <Line type="monotone" dataKey="land"    name="Land Records" stroke="#9a7740" strokeWidth={2.5} dot={{ r: 3, fill: '#9a7740' }} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Farmer Category Distribution" subtitle="Breakdown by landholding size">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" name="Farmers" fill="#2d8c2d" radius={[6, 6, 0, 0]}>
                {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts — row 2 */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartCard title="Income Distribution" subtitle="Farmers by annual income range">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incomeRanges} layout="vertical" margin={{ top: 0, right: 5, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="range" type="category" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={60} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" name="Farmers" fill="#4ab84a" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Land Type by Area" subtitle="Acres across land use types">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={landTypeData} dataKey="area" nameKey="type" cx="50%" cy="50%" outerRadius={75} paddingAngle={4}>
                {landTypeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v} acres`]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Data Quality Radar" subtitle="Overall system health metrics (%)">
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: '#9ca3af' }} />
              <Radar dataKey="A" stroke="#2d8c2d" fill="#2d8c2d" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`]} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Scheme vs enrollment */}
      <ChartCard title="Scheme Eligible vs. Enrolled" subtitle="Comparison of eligible farmers vs. actual enrollments">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={schemeData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="eligible"  name="Eligible Farmers" fill="#b5e8b5" radius={[4, 4, 0, 0]} />
            <Bar dataKey="enrolled"  name="Enrolled Farmers" fill="#2d8c2d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Village summary table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100 dark:border-stone-800">
          <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm">Village-wise Farmer Count</h3>
          <p className="text-xs text-stone-400 mt-0.5">Distribution across villages in Ludhiana district</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Village</th>
                <th>Farmers</th>
                <th>Coverage</th>
                <th className="hidden sm:table-cell">Avg. Land (ac)</th>
              </tr>
            </thead>
            <tbody>
              {villageData.map(({ village, count }, i) => {
                const pct = Math.round(count / FARMERS.length * 100)
                const villFarmers = FARMERS.filter(f => f.village === village)
                const avgLand = (villFarmers.reduce((s, f) => s + f.landArea, 0) / villFarmers.length).toFixed(1)
                return (
                  <tr key={village}>
                    <td className="text-stone-400 text-xs w-8">{i + 1}</td>
                    <td className="font-semibold text-stone-800 dark:text-stone-200">{village}</td>
                    <td className="font-bold text-brand-600 dark:text-brand-400">{count}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden min-w-[60px]">
                          <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-stone-400 w-8">{pct}%</span>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell text-stone-600 dark:text-stone-400">{avgLand}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
