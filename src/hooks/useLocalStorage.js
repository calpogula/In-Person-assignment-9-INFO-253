import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved === null ? initialValue : JSON.parse(saved)
    } catch (err) {
      return initialValue
    }
  })

  const setValue = (value) => {
    const nextValue = typeof value === 'function' ? value(storedValue) : value
    setStoredValue(nextValue)
    localStorage.setItem(key, JSON.stringify(nextValue))
  }

  return [storedValue, setValue]
}
