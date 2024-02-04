import { isBrowser as checkIsBrowser } from "@/utils"
import { useLayoutEffect, useEffect } from "react"
// check if is browser
const isBrowser = checkIsBrowser()
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect
