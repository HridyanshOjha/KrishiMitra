import { cn } from '@/utils/helpers'

const variants = {
  green:  'bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-400',
  amber:  'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
  red:    'bg-red-100   dark:bg-red-950/60   text-red-700   dark:text-red-400',
  blue:   'bg-blue-100  dark:bg-blue-950/60  text-blue-700  dark:text-blue-400',
  stone:  'bg-stone-100 dark:bg-stone-800    text-stone-600 dark:text-stone-400',
  purple: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400',
}

export default function Badge({ children, variant = 'stone', className, dot = false }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
      variants[variant],
      className
    )}>
      {dot && (
        <span className={cn('w-1.5 h-1.5 rounded-full', {
          'bg-brand-500': variant === 'green',
          'bg-amber-500': variant === 'amber',
          'bg-red-500':   variant === 'red',
          'bg-blue-500':  variant === 'blue',
          'bg-stone-400': variant === 'stone',
        })} />
      )}
      {children}
    </span>
  )
}
