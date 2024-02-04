import { DependencyList, EffectCallback, useEffect, useRef } from "react"

export default function useUpdate(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const mountedRef = useRef(false)
  useEffect(() => {
    if (mountedRef.current) {
      return effect()
    } else {
      mountedRef.current = true
    }
  }, deps)
}
