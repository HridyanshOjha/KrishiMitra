import { useState } from 'react'
import { FilePlus, Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import LandTable from '@/components/land/LandTable'
import LandForm from '@/components/land/LandForm'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { LAND_RECORDS } from '@/data/land'
import { exportCSV, generateId } from '@/utils/export'

const CSV_COLUMNS = ['id', 'farmerId', 'ownerName', 'khasraNo', 'area', 'unit', 'landType', 'soilType', 'village', 'taluka', 'district', 'irrigated', 'irrigationSource', 'ownership', 'status', 'lastUpdated']

export default function LandPage() {
  const [records, setRecords] = useLocalStorage('km-land', LAND_RECORDS)
  const [formOpen, setFormOpen] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [deleting, setDeleting] = useState(null)

  const handleAdd    = ()  => { setEditing(null); setFormOpen(true) }
  const handleEdit   = (r) => { setEditing(r);    setFormOpen(true) }
  const handleDelete = (r) => setDeleting(r)

  const handleSave = (data) => {
    const today = new Date().toISOString().split('T')[0]
    if (editing) {
      setRecords(prev => prev.map(r => r.id === editing.id ? { ...r, ...data, lastUpdated: today } : r))
    } else {
      const newId = generateId('LR', records)
      setRecords(prev => [...prev, { ...data, id: newId, lastUpdated: today }])
    }
  }

  const handleConfirmDelete = () => {
    setRecords(prev => prev.filter(r => r.id !== deleting.id))
    setDeleting(null)
  }

  const handleExport = () => exportCSV(records, 'land_records_export', CSV_COLUMNS)

  // Derived stats
  const totalArea  = records.reduce((s, r) => s + (r.area || 0), 0).toFixed(1)
  const irrigated  = records.filter(r => r.irrigated).length
  const cultivated = records.filter(r => r.status === 'Cultivated').length
  const owned      = records.filter(r => r.ownership === 'Owned').length
  const leased     = records.filter(r => r.ownership === 'Leased').length
  const shared     = records.filter(r => r.ownership === 'Shared').length
  const total      = records.length || 1 // avoid divide-by-zero

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Land Records</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {records.length} parcels · {totalArea} total acres across Ludhiana
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={14} />
            Export CSV
          </Button>
          <Button onClick={handleAdd} size="sm">
            <FilePlus size={14} />
            Add Record
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Parcels', value: records.length,            color: 'text-brand-600 dark:text-brand-400' },
          { label: 'Total Acres',   value: `${totalArea} ac`,         color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Irrigated',     value: `${irrigated}/${records.length}`, color: 'text-blue-600 dark:text-blue-400'  },
          { label: 'Cultivated',    value: cultivated,                color: 'text-brand-600 dark:text-brand-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 shadow-soft">
            <div className={`text-xl font-bold ${color}`}>{value}</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Ownership breakdown */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wide text-stone-400 dark:text-stone-500 mb-3">
          Ownership split
        </p>
        <div className="flex flex-wrap gap-5">
          {[
            { label: 'Owned',  count: owned,  pct: Math.round(owned  / total * 100) },
            { label: 'Leased', count: leased, pct: Math.round(leased / total * 100) },
            { label: 'Shared', count: shared, pct: Math.round(shared / total * 100) },
          ].map(({ label, count, pct }) => (
            <div key={label} className="flex items-center gap-3 min-w-[160px]">
              <div className="flex-1 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-500 dark:bg-brand-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-bold text-stone-700 dark:text-stone-300 w-4 text-right">{count}</span>
              <span className="text-xs text-stone-400">{label} <span className="font-semibold text-stone-500">({pct}%)</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <LandTable records={records} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add / Edit modal */}
      <LandForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        initial={editing}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Land Record"
        message={`Remove land record ${deleting?.id} (Khasra: ${deleting?.khasraNo}, Owner: ${deleting?.ownerName})? This cannot be undone.`}
      />
    </div>
  )
}
