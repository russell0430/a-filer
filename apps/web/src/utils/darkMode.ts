import localStorageHelper from "./localStorage"
type DarkModeTheme = "light" | "dark"

const darkModeHelper = localStorageHelper<DarkModeTheme>("theme")

const getDarkModeFromLocalStorage = darkModeHelper.get
const setDarkNodeToLocalStorage = darkModeHelper.set

const getDarkMode = () => {
  const darkMode = getDarkModeFromLocalStorage()
  if (
    darkMode === "dark" ||
    (darkMode === null &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return true
  } else return false
}

const toggleDarkMode = (defaultDarkMode?: boolean) => {
  const memorizedDarkMode = getDarkMode()
  const pendingDarkMode = defaultDarkMode ?? !memorizedDarkMode ?? false
  if (memorizedDarkMode === pendingDarkMode) return
  if (pendingDarkMode) {
    document.documentElement.classList.add("dark")
    setDarkNodeToLocalStorage("dark")
    return true
  } else {
    document.documentElement.classList.remove("dark")
    setDarkNodeToLocalStorage("light")
    return false
  }
}

export { toggleDarkMode, getDarkMode }
