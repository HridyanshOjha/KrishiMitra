import { useState, useEffect } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import FormField, { Input, Select } from '@/components/ui/FormField'
import {
  FARMER_CATEGORY_OPTIONS,
  FARMER_STATUS_OPTIONS,
  BANK_OPTIONS,
} from '@/data/farmers'

const EMPTY_FORM = {
  name: '', contact: '', aadhaar: '', gender: 'Male', age: '',
  village: '', district: 'Ludhiana', state: 'Punjab',
  landArea: '', crops: '', category: 'Small Farmer',
  status: 'Active', bank: '', annualIncome: '',
}

export default function FarmerForm({ open, onClose, onSave, initial }) {
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
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.contact.trim()) e.contact = 'Contact is required'
    else if (!/^\d{10}$/.test(form.contact)) e.contact = 'Enter valid 10-digit number'
    if (!form.village.trim()) e.village = 'Village is required'
    if (!form.landArea)       e.landArea = 'Land area is required'
    return e
  }

  const handleSave = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    onSave({
      ...form,
      landArea: parseFloat(form.landArea) || 0,
      annualIncome: parseInt(form.annualIncome) || 0,
      age: parseInt(form.age) || 0,
    })
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Farmer' : 'Add New Farmer'}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{initial ? 'Update' : 'Add Farmer'}</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Full Name" error={errors.name} required className="sm:col-span-2">
          <Input placeholder="e.g. Ramesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
        </FormField>

        <FormField label="Mobile Number" error={errors.contact} required>
          <Input placeholder="10-digit number" value={form.contact} onChange={e => set('contact', e.target.value)} />
        </FormField>

        <FormField label="Aadhaar Number">
          <Input placeholder="XXXX-XXXX-XXXX" value={form.aadhaar} onChange={e => set('aadhaar', e.target.value)} />
        </FormField>

        <FormField label="Gender">
          <Select value={form.gender} onChange={e => set('gender', e.target.value)}>
            {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
          </Select>
        </FormField>

        <FormField label="Age">
          <Input type="number" placeholder="e.g. 45" value={form.age} onChange={e => set('age', e.target.value)} />
        </FormField>

        <FormField label="Village" error={errors.village} required>
          <Input placeholder="Village name" value={form.village} onChange={e => set('village', e.target.value)} />
        </FormField>

        <FormField label="District">
          <Input placeholder="District" value={form.district} onChange={e => set('district', e.target.value)} />
        </FormField>

        <FormField label="State">
          <Input placeholder="State" value={form.state} onChange={e => set('state', e.target.value)} />
        </FormField>

        <FormField label="Land Area (Acres)" error={errors.landArea} required>
          <Input type="number" step="0.1" placeholder="e.g. 4.5" value={form.landArea} onChange={e => set('landArea', e.target.value)} />
        </FormField>

        <FormField label="Primary Crops" className="sm:col-span-2">
          <Input placeholder="e.g. Wheat, Rice" value={form.crops} onChange={e => set('crops', e.target.value)} />
        </FormField>

        <FormField label="Farmer Category">
          <Select value={form.category} onChange={e => set('category', e.target.value)}>
            {FARMER_CATEGORY_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Status">
          <Select value={form.status} onChange={e => set('status', e.target.value)}>
            {FARMER_STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Bank Name">
          <Select value={form.bank} onChange={e => set('bank', e.target.value)}>
            <option value="">Select bank…</option>
            {BANK_OPTIONS.map(o => <option key={o}>{o}</option>)}
          </Select>
        </FormField>

        <FormField label="Annual Income (₹)">
          <Input type="number" placeholder="e.g. 85000" value={form.annualIncome} onChange={e => set('annualIncome', e.target.value)} />
        </FormField>
      </div>
    </Modal>
  )
}
