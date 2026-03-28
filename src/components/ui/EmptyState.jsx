import { SearchX } from 'lucide-react'

export default function EmptyState({ title = 'No results found', description = 'Try adjusting your search or filters.', icon: Icon = SearchX }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
        <Icon size={24} className="text-stone-400" />
      </div>
      <h3 className="text-sm font-semibold text-stone-600 dark:text-stone-400 mb-1">{title}</h3>
      <p className="text-xs text-stone-400 dark:text-stone-500 max-w-xs">{description}</p>
    </div>
  )
}
