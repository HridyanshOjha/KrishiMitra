import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

const monthlyRegistrations = [
  { month: 'Aug', farmers: 3, land: 4 },
  { month: 'Sep', farmers: 5, land: 5 },
  { month: 'Oct', farmers: 4, land: 3 },
  { month: 'Nov', farmers: 7, land: 8 },
  { month: 'Dec', farmers: 6, land: 6 },
  { month: 'Jan', farmers: 9, land: 7 },
  { month: 'Feb', farmers: 8, land: 9 },
  { month: 'Mar', farmers: 12, land: 10 },
]

const cropDistribution = [
  { name: 'Wheat',      value: 42 },
  { name: 'Rice/Paddy', value: 28 },
  { name: 'Cotton',     value: 12 },
  { name: 'Vegetables', value: 10 },
  { name: 'Others',     value: 8  },
]

const schemeEnrollment = [
  { scheme: 'PM-KISAN', enrolled: 8 },
  { scheme: 'KCC',      enrolled: 9 },
  { scheme: 'PMFBY',    enrolled: 6 },
  { scheme: 'SHC',      enrolled: 11 },
  { scheme: 'PMKSY',    enrolled: 4 },
  { scheme: 'e-NAM',    enrolled: 5 },
]

const COLORS = ['#2d8c2d', '#4ab84a', '#7dd47d', '#b5e8b5', '#c8b082']

const tooltipStyle = {
  backgroundColor: 'var(--tooltip-bg, #fff)',
  border: '1px solid #e5e7eb',
  borderRadius: '10px',
  fontSize: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
}

export function RegistrationsChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={monthlyRegistrations} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="farmersGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#2d8c2d" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#2d8c2d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="landGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#9a7740" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#9a7740" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
        <Area type="monotone" dataKey="farmers" name="Farmers" stroke="#2d8c2d" fill="url(#farmersGrad)" strokeWidth={2} dot={false} />
        <Area type="monotone" dataKey="land" name="Land Records" stroke="#9a7740" fill="url(#landGrad)" strokeWidth={2} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function CropDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={cropDistribution}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {cropDistribution.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={tooltipStyle}
          formatter={(v) => [`${v}%`, 'Share']}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '11px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function SchemeEnrollmentChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={schemeEnrollment} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="scheme" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#f0faf0' }} />
        <Bar dataKey="enrolled" name="Enrolled Farmers" fill="#2d8c2d" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
