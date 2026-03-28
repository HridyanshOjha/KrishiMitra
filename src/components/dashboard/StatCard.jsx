import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/utils/helpers'

const colorMap = {
  green:  { bg: 'bg-brand-50  dark:bg-brand-950/40',  icon: 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400' },
  amber:  { bg: 'bg-amber-50  dark:bg-amber-950/40',  icon: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400' },
  blue:   { bg: 'bg-blue-50   dark:bg-blue-950/40',   icon: 'bg-blue-100  dark:bg-blue-900/50  text-blue-600  dark:text-blue-400'  },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/40', icon: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400' },
  red:    { bg: 'bg-red-50    dark:bg-red-950/40',    icon: 'bg-red-100   dark:bg-red-900/50   text-red-600   dark:text-red-400'   },
}

export default function StatCard({ label, value, icon: Icon, color = 'green', trend, trendLabel, className }) {
  const colors = colorMap[color] || colorMap.green

  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus
  const trendColor = trend > 0 ? 'text-brand-600 dark:text-brand-400' : trend < 0 ? 'text-red-600 dark:text-red-400' : 'text-stone-400'

  return (
    <div className={cn(
      'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-soft',
      'animate-fade-up',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors.icon)}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 text-xs font-semibold', trendColor)}>
            <TrendIcon size={13} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-stone-800 dark:text-stone-100 leading-none mb-1">
        {value}
      </div>
      <div className="text-sm text-stone-500 dark:text-stone-400">{label}</div>
      {trendLabel && (
        <div className="text-xs text-stone-400 dark:text-stone-500 mt-1">{trendLabel}</div>
      )}
    </div>
  )
}
