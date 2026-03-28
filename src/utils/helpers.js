import { clsx } from 'clsx'

export function cn(...args) {
  return clsx(args)
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr) {
  if (!dateStr || dateStr === 'Ongoing') return dateStr
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

export function getStatusBadgeClass(status) {
  const map = {
    Active: 'badge-green',
    Inactive: 'badge-red',
    Pending: 'badge-amber',
    Cultivated: 'badge-green',
    Fallow: 'badge-amber',
    'Under Survey': 'badge-blue',
    Disputed: 'badge-red',
    'Closing Soon': 'badge-amber',
    Closed: 'badge-stone',
  }
  return map[status] || 'badge-stone'
}

export function pluralize(count, word) {
  return `${count} ${count === 1 ? word : word + 's'}`
}

export function filterBySearch(items, query, fields) {
  if (!query.trim()) return items
  const q = query.toLowerCase()
  return items.filter(item =>
    fields.some(field => String(item[field] ?? '').toLowerCase().includes(q))
  )
}
