import { useCallback, useState } from "react"
import localStorageHelper from "@/utils/localStorage"

export const folderFormat = ["GRID", "LIST"] as const

export type FolderFormat = (typeof folderFormat)[number]
const { get, set } = localStorageHelper<FolderFormat>("folder-format")

// can only used in single place
const useFolderFormat = (defaultFolderFormat: FolderFormat = "LIST") => {
  const [innerFormat, setInnerFormat] = useState<FolderFormat>(
    get() || defaultFolderFormat
  )

  const setFormat = useCallback((format: FolderFormat) => {
    setInnerFormat(format)
    set(format)
  }, [])

  return [innerFormat, setFormat] as const
}

export default useFolderFormat
