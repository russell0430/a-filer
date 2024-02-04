import { ForwardedRef, Ref } from "react"

export default function useMergedRef<T>(
  ...refs: (ForwardedRef<T> | undefined)[]
): Ref<T> {
  return (instance: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(instance)
      } else if (ref && "current" in ref) {
        ref.current = instance
      }
    })
  }
}
