import { useEffect, useRef } from "react"

export default function useUnMount(effect: () => void) {
  const effectRef = useRef(effect)
  effectRef.current = effect
  useEffect(() => {
    return () => {
      effectRef.current()
    }
  }, [])
}

