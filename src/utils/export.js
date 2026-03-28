/**
 * Convert an array of objects to a CSV string and trigger browser download.
 * @param {Object[]} rows  - Array of plain objects
 * @param {string}   filename - Download filename (without extension)
 * @param {string[]} [columns] - Optional ordered subset of keys to include
 */
export function exportCSV(rows, filename, columns) {
  if (!rows || rows.length === 0) return

  const keys = columns || Object.keys(rows[0])

  const header = keys.join(',')
  const body = rows.map(row =>
    keys.map(k => {
      const val = row[k] ?? ''
      // Wrap in quotes if value contains comma, newline, or quotes
      const str = String(val).replace(/"/g, '""')
      return /[,\n"]/.test(str) ? `"${str}"` : str
    }).join(',')
  )

  const csv = [header, ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/** Generate a collision-safe ID given existing records */
export function generateId(prefix, existingRecords, idField = 'id') {
  const existing = new Set(existingRecords.map(r => r[idField]))
  let n = existingRecords.length + 1
  let candidate = `${prefix}-${String(n).padStart(3, '0')}`
  while (existing.has(candidate)) {
    n++
    candidate = `${prefix}-${String(n).padStart(3, '0')}`
  }
  return candidate
}
