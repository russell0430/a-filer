import { FolderFormat } from "@/hooks/useFolderFormat"
export interface ConfigContextObject {
  darkMode: boolean
  toggleDarkMode: () => void
  format: FolderFormat
  setFormat: (format: FolderFormat) => void
}
