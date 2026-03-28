import { useState, useMemo } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SearchInput from '@/components/ui/SearchInput'
import Pagination from '@/components/ui/Pagination'
import EmptyState from '@/components/ui/EmptyState'
import { Select } from '@/components/ui/FormField'
import { getInitials, filterBySearch } from '@/utils/helpers'

const PAGE_SIZE = 8

export default function FarmerTable({ farmers, onEdit, onDelete }) {
  const [search, setSearch]       = useState('')
  const [statusFilter, setStatus] = useState('All')
  const [page, setPage]           = useState(1)

  const filtered = useMemo(() => {
    let rows = filterBySearch(farmers, search, ['name', 'id', 'village', 'district', 'contact', 'crops'])
    if (statusFilter !== 'All') rows = rows.filter(f => f.status === statusFilter)
    return rows
  }, [farmers, search, statusFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (v) => { setSearch(v); setPage(1) }
  const handleStatus = (v) => { setStatus(v); setPage(1) }

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-soft overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-stone-100 dark:border-stone-800">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search by name, ID, village…"
          className="flex-1"
        />
        <Select
          value={statusFilter}
          onChange={e => handleStatus(e.target.value)}
          className="sm:w-40"
        >
          {['All', 'Active', 'Inactive', 'Pending'].map(s => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <span className="text-xs text-stone-400 dark:text-stone-500 self-center whitespace-nowrap">
          {filtered.length} records
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {paged.length === 0 ? (
          <EmptyState title="No farmers found" description="Try a different search query or filter." />
        ) : (
          <table className="w-full data-table">
            <thead>
              <tr>
                <th>Farmer</th>
                <th>ID</th>
                <th className="hidden md:table-cell">Contact</th>
                <th className="hidden lg:table-cell">Location</th>
                <th className="hidden lg:table-cell">Land (Acres)</th>
                <th className="hidden xl:table-cell">Category</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(farmer => (
                <tr key={farmer.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-brand-700 dark:text-brand-400">
                          {getInitials(farmer.name)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-stone-800 dark:text-stone-200 text-sm leading-tight">{farmer.name}</div>
                        <div className="text-[11px] text-stone-400">{farmer.crops}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <code className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-lg text-stone-600 dark:text-stone-400">
                      {farmer.id}
                    </code>
                  </td>
                  <td className="hidden md:table-cell text-stone-600 dark:text-stone-400">{farmer.contact}</td>
                  <td className="hidden lg:table-cell">
                    <div className="text-sm text-stone-700 dark:text-stone-300">{farmer.village}</div>
                    <div className="text-xs text-stone-400">{farmer.district}</div>
                  </td>
                  <td className="hidden lg:table-cell font-semibold text-stone-700 dark:text-stone-300">
                    {farmer.landArea}
                  </td>
                  <td className="hidden xl:table-cell">
                    <span className="text-xs text-stone-500 dark:text-stone-400">{farmer.category}</span>
                  </td>
                  <td>
                    <Badge variant={
                      farmer.status === 'Active' ? 'green' :
                      farmer.status === 'Inactive' ? 'red' : 'amber'
                    } dot>
                      {farmer.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit(farmer)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(farmer)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Delete"
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

      {/* Pagination */}
      {filtered.length > PAGE_SIZE && (
        <div className="px-4 pb-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  )
}
