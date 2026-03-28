import { useState, useCallback } from 'react'

/**
 * Persistent state backed by localStorage.
 * Falls back to initialValue silently on any error (private mode, quota exceeded, etc.)
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch {
      // Silently ignore: private browsing, storage quota exceeded, serialization errors
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}
