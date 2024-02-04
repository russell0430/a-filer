import { useRef, useCallback } from "react"

const useArrayRef = () => {
  const instanceRef = useRef(new Map<number, HTMLElement>())
  const setInstanceRef = useCallback((key: number, instance: HTMLElement) => {
    if (instance) {
      instanceRef.current.set(key, instance)
    } else {
      instanceRef.current.delete(key)
    }
  }, [])

  return { instanceRef, setInstanceRef }
}

export { useArrayRef }
