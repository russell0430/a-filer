import { useEffect, useCallback, useState } from "react"
import { toggleDarkMode, getDarkMode } from "../utils/darkMode"

const useDarkMode = (defaultDarkMode?: boolean) => {
  const [darkMode, setDarkMode] = useState(defaultDarkMode ?? getDarkMode)
  const toggleInternalDarkMode = useCallback((darkMode?: boolean) => {
    if (toggleDarkMode(darkMode)) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])
  // useEffect(() => {
  //   toggleDarkMode()
  // }, [])
  return [darkMode, toggleInternalDarkMode] as const
}

export default useDarkMode
