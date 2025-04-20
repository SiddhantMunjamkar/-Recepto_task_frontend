

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        // Dispatch a custom event to notify other tabs/windows
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(valueToStore) }))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

export function useOrganizationData<T>(key: string, initialValue: T) {
  const [value, setValue] = useLocalStorage<T>(key, initialValue)

  // Subscribe to changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key, initialValue, setValue])

  return [value, setValue] as const
}
