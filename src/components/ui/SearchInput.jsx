import { Search, X } from 'lucide-react'
import { cn } from '@/utils/helpers'

export default function SearchInput({ value, onChange, placeholder = 'Search…', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-8 py-2.5 text-sm rounded-xl',
          'bg-stone-50 dark:bg-stone-800',
          'border border-stone-200 dark:border-stone-700',
          'text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500',
          'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent',
          'transition-all duration-150'
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
