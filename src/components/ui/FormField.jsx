import { cn } from '@/utils/helpers'

export default function FormField({ label, error, children, className, required }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-3 py-2.5 text-sm rounded-xl',
        'bg-stone-50 dark:bg-stone-800',
        'border border-stone-300 dark:border-stone-600',
        'text-stone-800 dark:text-stone-100 placeholder-stone-400',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
        'transition-all duration-150',
        className
      )}
      {...props}
    />
  )
}

export function Select({ className, children, ...props }) {
  return (
    <select
      className={cn(
        'w-full px-3 py-2.5 text-sm rounded-xl',
        'bg-stone-50 dark:bg-stone-800',
        'border border-stone-300 dark:border-stone-600',
        'text-stone-800 dark:text-stone-100',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
        'transition-all duration-150 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      rows={3}
      className={cn(
        'w-full px-3 py-2.5 text-sm rounded-xl resize-none',
        'bg-stone-50 dark:bg-stone-800',
        'border border-stone-300 dark:border-stone-600',
        'text-stone-800 dark:text-stone-100 placeholder-stone-400',
        'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
        'transition-all duration-150',
        className
      )}
      {...props}
    />
  )
}
