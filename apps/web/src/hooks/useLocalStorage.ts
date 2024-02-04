import { useCallback } from "react"

export default (key: string) => {
  return {
    getItem: useCallback(() => localStorage.getItem(key), [key]),
    setItem: useCallback(
      (item: string) => localStorage.setItem(key, item),
      [key]
    ),
    removeItem: useCallback(() => localStorage.removeItem(key), [key]),
  }
}
