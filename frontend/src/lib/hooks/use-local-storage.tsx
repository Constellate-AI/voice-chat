import { useEffect, useState } from 'react'

export function useLocalStorage <T>(
    key: string,
    initialValue: T
): [T, (value: T) => void, boolean]  {
    const [storedValue, setStoredValue] = useState(initialValue)
    const [checked, setChecked] = useState(false)

    const storageKey = `ULS:${key}`

    useEffect(() => {
        // Retrieve from localStorage
        const item = window.localStorage.getItem(storageKey)
        if (item && item !== 'undefined') {
            setStoredValue(JSON.parse(item))
        }
        setChecked(true)
    }, [key])

    const setValue = (value: T) => {
        // Save state
        setStoredValue(value)
        // Save to localStorage
        window.localStorage.setItem(storageKey, JSON.stringify(value))
    }
    return [storedValue, setValue, checked]
}