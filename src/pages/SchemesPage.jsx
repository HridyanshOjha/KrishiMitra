import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, Info } from 'lucide-react'
import SchemeCard from '@/components/schemes/SchemeCard'
import SearchInput from '@/components/ui/SearchInput'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import { SCHEMES, SCHEME_TYPE_OPTIONS, SCHEME_STATUS_OPTIONS } from '@/data/schemes'

export default function SchemesPage() {
  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('All')
  const [statusFilter, setStatus] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return SCHEMES.filter(s => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.shortName.toLowerCase().includes(q) ||
        s.type.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.benefit.toLowerCase().includes(q)
      const matchType   = typeFilter === 'All'   || s.type === typeFilter
      const matchStatus = statusFilter === 'All' || s.status === statusFilter
      return matchSearch && matchType && matchStatus
    })
  }, [search, typeFilter, statusFilter])

  const activeCount      = SCHEMES.filter(s => s.status === 'Active').length
  const closingCount     = SCHEMES.filter(s => s.status === 'Closing Soon').length
  const totalEnrolled    = SCHEMES.reduce((s, sc) => s + sc.enrolledFarmers, 0)
  const hasActiveFilters = typeFilter !== 'All' || statusFilter !== 'All' || search

  const clearFilters = () => { setSearch(''); setType('All'); setStatus('All') }

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Beneficiary Schemes</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {SCHEMES.length} government schemes · {totalEnrolled} total enrollments
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(f => !f)}
          className={showFilters ? 'bg-brand-50 dark:bg-brand-950/30 border-brand-300 dark:border-brand-700 text-brand-700 dark:text-brand-400' : ''}
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-brand-500 ml-0.5" />}
        </Button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900 rounded-xl px-4 py-3">
          <div className="text-xl font-bold text-brand-700 dark:text-brand-400">{activeCount}</div>
          <div className="text-xs text-brand-600 dark:text-brand-500">Active schemes</div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl px-4 py-3">
          <div className="text-xl font-bold text-amber-700 dark:text-amber-400">{closingCount}</div>
          <div className="text-xs text-amber-600 dark:text-amber-500">Closing soon</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl px-4 py-3">
          <div className="text-xl font-bold text-blue-700 dark:text-blue-400">{totalEnrolled}</div>
          <div className="text-xs text-blue-600 dark:text-blue-500">Total enrolled</div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="space-y-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search schemes by name, type, benefit…"
          className="max-w-lg"
        />

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl animate-fade-in">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wide text-stone-400 mb-1">Type</label>
              <select
                value={typeFilter}
                onChange={e => setType(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {SCHEME_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wide text-stone-400 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={e => setStatus(e.target.value)}
                className="text-sm px-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                {SCHEME_STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline mt-4"
              >
                <X size={13} /> Clear all
              </button>
            )}
          </div>
        )}

        {/* Active filter badges */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400">Filters:</span>
            {search && (
              <button onClick={() => setSearch('')} className="flex items-center gap-1 px-2.5 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-200">
                "{search}" <X size={10} />
              </button>
            )}
            {typeFilter !== 'All' && (
              <button onClick={() => setType('All')} className="flex items-center gap-1 px-2.5 py-1 bg-brand-100 dark:bg-brand-950/50 rounded-full text-xs font-semibold text-brand-700 dark:text-brand-400 hover:bg-brand-200">
                {typeFilter} <X size={10} />
              </button>
            )}
            {statusFilter !== 'All' && (
              <button onClick={() => setStatus('All')} className="flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-950/50 rounded-full text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-200">
                {statusFilter} <X size={10} />
              </button>
            )}
            <span className="text-xs text-stone-400">{filtered.length} results</span>
          </div>
        )}
      </div>

      {/* Closing soon notice */}
      {closingCount > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl">
          <Info size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>{closingCount} scheme{closingCount > 1 ? 's are' : ' is'} closing soon.</strong>{' '}
            Ensure eligible farmers are enrolled before the deadline.
          </p>
        </div>
      )}

      {/* Scheme cards grid */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No schemes found"
          description="Try adjusting your search or clearing filters."
          icon={Search}
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  )
}
