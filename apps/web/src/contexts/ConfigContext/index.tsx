import { createContext, useContext, useMemo } from "react"
import { ConfigContextObject } from "./context"
import useFolderFormat from "@/hooks/useFolderFormat"
import useDarkMode from "@/hooks/useDarkMode"
const ConfigContext = createContext({} as ConfigContextObject)
// for
// 1. darkMode
// 2. folder format
export const ConfigContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [format, setFormat] = useFolderFormat()
  const [darkMode, toggleDarkMode] = useDarkMode()

  const value = useMemo(
    () => ({
      format,
      setFormat,
      darkMode,
      toggleDarkMode,
    }),
    [darkMode, format, toggleDarkMode, setFormat]
  )
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}

export const useConfig = (): ConfigContextObject => useContext(ConfigContext)
