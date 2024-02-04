// reference
// https://github1s.com/mui/material-ui/blob/master/packages/mui-material/src/useMediaQuery/useMediaQuery.ts
// the version without ssr and with useSyncExternalStore
import React from "react"
function useMediaQueryNew(
  query: string,
  defaultMatches: boolean,
  matchMedia: typeof window.matchMedia | null
) {
  const getDefaultSnapshot = React.useCallback(
    () => defaultMatches,
    [defaultMatches]
  )
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (matchMedia === null) {
      return [
        getDefaultSnapshot,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => () => {},
      ]
    }
    const mediaQueryList = matchMedia(query)
    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        mediaQueryList.addEventListener("change", notify)
        return () => mediaQueryList.removeEventListener("change", notify)
      },
    ]
  }, [getDefaultSnapshot, matchMedia, query])
  const match = React.useSyncExternalStore(subscribe, getSnapshot)
  return match
}

export default function useMediaQuery(
  queryInput: string,
  options = {}
): boolean {
  const supportMatchMedia =
    typeof window !== "undefined" && typeof window.matchMedia !== "undefined"
  const defaultMatches = React.useRef(false)
  let query = queryInput
  query = query.replace(/^@media( ?)/m, "")
  const useMediaQueryImplementation = useMediaQueryNew
  const match = useMediaQueryImplementation(
    query,
    defaultMatches.current,
    matchMedia
  )
  return match
}
