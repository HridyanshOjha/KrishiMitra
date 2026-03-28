import { useState, useMemo } from 'react'
import { Pencil, Trash2, Droplets } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import { Select } from '@/components/ui/FormField'
import { filterBySearch } from '@/utils/helpers'

const PAGE_SIZE = 8

const statusVariant = {
  Cultivated: 'green',
  Fallow: 'amber',
  'Under Survey': 'blue',
  Disputed: 'red',
}

export default function LandTable({ records, onEdit, onDelete }) {
  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('All')
  const [page, setPage]         = useState(1)

  const filtered = useMemo(() => {
    let rows = filterBySearch(records, search, ['ownerName', 'id', 'khasraNo', 'village', 'landType', 'farmerId'])
    if (typeFilter !== 'All') rows = rows.filter(r => r.landType === typeFilter)
    return rows
  }, [records, search, typeFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-stone-100 dark:border-stone-800">
        <SearchInput
          value={search}
          onChange={v => { setSearch(v); setPage(1) }}
          placeholder="Search by owner, khasra, village…"
          className="flex-1"
        />
        <Select
          value={typeFilter}
          onChange={e => { setType(e.target.value); setPage(1) }}
          className="sm:w-44"
        >
          {['All', 'Agricultural', 'Horticulture', 'Mixed', 'Barren'].map(t => (
            <option key={t}>{t}</option>
          ))}
        </Select>
        <span className="text-xs text-stone-400 self-center whitespace-nowrap">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {paged.length === 0 ? (
          <EmptyState title="No land records found" description="Try adjusting your filters." />
        ) : (
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Khasra No.</th>
                <th>Area</th>
                <th className="hidden md:table-cell">Type</th>
                <th className="hidden lg:table-cell">Village</th>
                <th className="hidden lg:table-cell">Soil</th>
                <th className="hidden xl:table-cell">Irrigation</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(rec => (
                <tr key={rec.id}>
                  <td>
                    <div className="font-semibold text-stone-800 dark:text-stone-200 text-sm">{rec.ownerName}</div>
                    <div className="text-[11px] text-stone-400">{rec.farmerId}</div>
                  </td>
                  <td>
                    <code className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg text-stone-600 dark:text-stone-400">
                      {rec.khasraNo}
                    </code>
                  </td>
                  <td className="font-semibold text-stone-700 dark:text-stone-300">
                    {rec.area} <span className="font-normal text-xs text-stone-400">{rec.unit}</span>
                  </td>
                  <td className="hidden md:table-cell text-sm text-stone-600 dark:text-stone-400">{rec.landType}</td>
                  <td className="hidden lg:table-cell text-sm text-stone-600 dark:text-stone-400">{rec.village}</td>
                  <td className="hidden lg:table-cell text-sm text-stone-500 dark:text-stone-500">{rec.soilType}</td>
                  <td className="hidden xl:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Droplets
                        size={13}
                        className={rec.irrigated ? 'text-blue-500' : 'text-stone-300'}
                      />
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {rec.irrigationSource}
                      </span>
                    </div>
                  </td>
                  <td>
                    <Badge variant={statusVariant[rec.status] || 'stone'} dot>
                      {rec.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(rec)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(rec)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {filtered.length > PAGE_SIZE && (
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  )
}
