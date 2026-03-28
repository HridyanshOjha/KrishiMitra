import { useState } from 'react'
import { UserPlus, Download, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import FarmerTable from '@/components/farmers/FarmerTable'
import FarmerForm from '@/components/farmers/FarmerForm'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import Badge from '@/components/ui/Badge'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FARMERS } from '@/data/farmers'
import { exportCSV, generateId } from '@/utils/export'

const CSV_COLUMNS = ['id', 'name', 'contact', 'village', 'district', 'state', 'landArea', 'crops', 'category', 'status', 'annualIncome', 'bank', 'joined']

export default function FarmersPage() {
  const [farmers, setFarmers] = useLocalStorage('km-farmers', FARMERS)
  const [formOpen, setFormOpen] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [deleting, setDeleting] = useState(null)

  const handleAdd    = ()  => { setEditing(null); setFormOpen(true) }
  const handleEdit   = (f) => { setEditing(f);    setFormOpen(true) }
  const handleDelete = (f) => setDeleting(f)

  const handleSave = (data) => {
    if (editing) {
      setFarmers(prev => prev.map(f => f.id === editing.id ? { ...f, ...data } : f))
    } else {
      const newId = generateId('KM', farmers)
      setFarmers(prev => [...prev, { ...data, id: newId, joined: new Date().toISOString().split('T')[0] }])
    }
  }

  const handleConfirmDelete = () => {
    setFarmers(prev => prev.filter(f => f.id !== deleting.id))
    setDeleting(null)
  }

  const handleExport = () => exportCSV(farmers, 'farmers_export', CSV_COLUMNS)

  // Summary stats
  const active   = farmers.filter(f => f.status === 'Active').length
  const inactive = farmers.filter(f => f.status === 'Inactive').length
  const pending  = farmers.filter(f => f.status === 'Pending').length
  const avgArea  = farmers.length
    ? (farmers.reduce((s, f) => s + (f.landArea || 0), 0) / farmers.length).toFixed(1)
    : '0.0'

  return (
    <div className="space-y-5 animate-fade-in">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-800 dark:text-stone-100">Farmer Management</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {farmers.length} farmers registered across Ludhiana district
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download size={14} />
            Export CSV
          </Button>
          <Button onClick={handleAdd} size="sm">
            <UserPlus size={14} />
            Add Farmer
          </Button>
        </div>
      </div>

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total',    value: farmers.length, badge: null    },
          { label: 'Active',   value: active,         badge: 'green' },
          { label: 'Inactive', value: inactive,        badge: 'red'   },
          { label: 'Pending',  value: pending,         badge: 'amber' },
        ].map(({ label, value, badge }) => (
          <div key={label} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl px-4 py-3 flex items-center justify-between shadow-soft">
            <span className="text-sm text-stone-500 dark:text-stone-400">{label}</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-stone-800 dark:text-stone-100">{value}</span>
              {badge && <Badge variant={badge} dot />}
            </div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className="bg-brand-50 dark:bg-brand-950/30 border border-brand-200 dark:border-brand-900 rounded-xl px-4 py-3 flex items-start gap-3">
        <Users size={16} className="text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-brand-700 dark:text-brand-400">
          Average holding: <strong>{avgArea} acres</strong> per farmer —&nbsp;
          {farmers.filter(f => f.category === 'Marginal Farmer').length} marginal,&nbsp;
          {farmers.filter(f => f.category === 'Small Farmer').length} small,&nbsp;
          {farmers.filter(f => f.category === 'Medium Farmer').length} medium,&nbsp;
          {farmers.filter(f => f.category === 'Large Farmer').length} large.
        </p>
      </div>

      {/* Table */}
      <FarmerTable farmers={farmers} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Add / Edit modal */}
      <FarmerForm
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
        title="Delete Farmer"
        message={`Remove ${deleting?.name} (${deleting?.id}) from the registry? This cannot be undone.`}
      />
    </div>
  )
}
