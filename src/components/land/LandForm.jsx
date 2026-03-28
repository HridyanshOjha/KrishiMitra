import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import FormField, { Input, Select } from '@/components/ui/FormField'
import {
  LAND_TYPE_OPTIONS,
  SOIL_TYPE_OPTIONS,
  OWNERSHIP_OPTIONS,
  LAND_STATUS_OPTIONS,
  IRRIGATION_SOURCE_OPTIONS,
} from '@/data/land'

const EMPTY_FORM = {
  ownerName: '', farmerId: '', khasraNo: '', area: '', unit: 'Acres',
  landType: 'Agricultural', soilType: 'Loamy',
  village: '', taluka: '', district: 'Ludhiana',
  irrigated: false, irrigationSource: 'Rain-fed',
  ownership: 'Owned', status: 'Cultivated',
}

export default function LandForm({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...EMPTY_FORM, ...initial } : EMPTY_FORM)
      setErrors({})
    }
  }, [open, initial])

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.ownerName.trim()) e.ownerName = 'Owner name is required'
    if (!form.khasraNo.trim())  e.khasraNo  = 'Khasra number is required'
    if (!form.area)             e.area      = 'Area is required'
    if (!form.village.trim())   e.village   = 'Village is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({ ...form, area: parseFloat(form.area) || 0 })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Land Record' : 'Add Land Record'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{initial ? 'Update' : 'Add Record'}</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Owner Name" error={errors.ownerName} required>
          <Input placeholder="Full name" value={form.ownerName} onChange={e => set('ownerName', e.target.value)} />
        </FormField>

        <FormField label="Farmer ID">
          <Input placeholder="e.g. KM-001" value={form.farmerId} onChange={e => set('farmerId', e.target.value)} />
        </FormField>

        <FormField label="Khasra Number" error={errors.khasraNo} required>
          <Input placeholder="e.g. KH-1234" value={form.khasraNo} onChange={e => set('khasraNo', e.target.value)} />
        </FormField>

        <FormField label="Area" error={errors.area} required>
          <div className="flex gap-2">
            <Input type="number" step="0.1" placeholder="e.g. 4.5" value={form.area} onChange={e => set('area', e.target.value)} />
            <Select value={form.unit} onChange={e => set('unit', e.target.value)} className="w-28">
              {['Acres', 'Hectares', 'Bigha'].map(u => <option key={u}>{u}</option>)}
            </Select>
          </div>
        </FormField>

        <FormField label="Land Type">
          <Select value={form.landType} onChange={e => set('landType', e.target.value)}>
            {LAND_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Soil Type">
          <Select value={form.soilType} onChange={e => set('soilType', e.target.value)}>
            {SOIL_TYPE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Village" error={errors.village} required>
          <Input placeholder="Village" value={form.village} onChange={e => set('village', e.target.value)} />
        </FormField>

        <FormField label="Taluka">
          <Input placeholder="Taluka" value={form.taluka} onChange={e => set('taluka', e.target.value)} />
        </FormField>

        <FormField label="District">
          <Input placeholder="District" value={form.district} onChange={e => set('district', e.target.value)} />
        </FormField>

        <FormField label="Ownership Type">
          <Select value={form.ownership} onChange={e => set('ownership', e.target.value)}>
            {OWNERSHIP_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Land Status">
          <Select value={form.status} onChange={e => set('status', e.target.value)}>
            {LAND_STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Irrigation Source">
          <Select value={form.irrigationSource} onChange={e => set('irrigationSource', e.target.value)}>
            {IRRIGATION_SOURCE_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Irrigated?" className="flex-row items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer mt-1">
            <input
              type="checkbox"
              checked={form.irrigated}
              onChange={e => set('irrigated', e.target.checked)}
              className="w-4 h-4 accent-brand-600 rounded"
            />
            <span className="text-sm text-stone-700 dark:text-stone-300">Yes, land is irrigated</span>
          </label>
        </FormField>
      </div>
    </Modal>
  )
}
