import { Users, Calendar, ExternalLink, Tag } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/utils/helpers'
import { cn } from '@/utils/helpers'

const colorBorder = {
  green: 'border-t-brand-500',
  blue: 'border-t-blue-500',
  amber: 'border-t-amber-500',
  earth: 'border-t-amber-700',
  purple: 'border-t-purple-500',
}

const colorBg = {
  green: 'bg-brand-50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-400',
  blue: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
  amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  earth: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-500',
  purple: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400',
}

export default function SchemeCard({ scheme }) {
  const isClosingSoon = scheme.status === 'Closing Soon'
  const isClosed      = scheme.status === 'Closed'

  return (
    <div className={cn(
      'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800',
      'rounded-2xl shadow-soft overflow-hidden border-t-4',
      'transition-all duration-200 hover:shadow-medium hover:-translate-y-0.5 flex flex-col',
      colorBorder[scheme.color] || colorBorder.green
    )}>
      {/* Header */}
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className={cn('px-2.5 py-1 rounded-lg text-xs font-bold', colorBg[scheme.color])}>
            {scheme.shortName}
          </div>
          <Badge variant={isClosingSoon ? 'amber' : isClosed ? 'stone' : 'green'} dot>
            {scheme.status}
          </Badge>
        </div>

        <h3 className="font-bold text-stone-800 dark:text-stone-100 text-sm leading-snug mb-1">
          {scheme.name}
        </h3>
        <p className="text-xs text-stone-400 dark:text-stone-500 mb-3">{scheme.ministry}</p>

        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed mb-4 line-clamp-3">
          {scheme.description}
        </p>

        {/* Benefit highlight */}
        <div className={cn('rounded-xl px-3 py-2.5 mb-4', colorBg[scheme.color])}>
          <div className="text-[10px] font-bold uppercase tracking-wide opacity-70 mb-0.5">Benefit</div>
          <div className="text-sm font-bold">{scheme.benefit}</div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <div>
            <div className="text-stone-400 dark:text-stone-500 mb-0.5">Eligibility</div>
            <div className="text-stone-700 dark:text-stone-300 font-medium leading-tight">{scheme.eligibility}</div>
          </div>
          <div>
            <div className="text-stone-400 dark:text-stone-500 mb-0.5">Type</div>
            <div className="text-stone-700 dark:text-stone-300 font-medium">{scheme.type}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {scheme.tags.map(tag => (
            <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400 rounded-full text-[10px] font-semibold">
              <Tag size={9} />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {scheme.enrolledFarmers} enrolled
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {scheme.deadline === 'Ongoing' ? 'Ongoing' : formatDate(scheme.deadline)}
          </span>
        </div>
        <a
          href={scheme.applyLink}
          className="flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
        >
          Apply <ExternalLink size={11} />
        </a>
      </div>
    </div>
  )
}
