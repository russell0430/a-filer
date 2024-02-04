import { SyntheticEvent } from "./types"

export const isMobile = /mobile/i.test(window.navigator.userAgent)

export const nameMap = {
  dragStart: isMobile ? "onTouchStart" : "onMouseDown",
  dragMove: isMobile ? "onTouchMove" : "onMouseMove",
  dragEnd: isMobile ? "onTouchEnd" : "onMouseUp",
}

const isReactMouseEvent = (
  event: SyntheticEvent
): event is React.MouseEvent | MouseEvent => {
  return ["mouse", "click"].includes(event.type.slice(0, 5))
}

export const getGlobalOffset = (
  e: SyntheticEvent
): { x: number; y: number } => {
  if (isReactMouseEvent(e)) {
    return { x: e.clientX, y: e.clientY }
  } else {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
}

export const roundEdgePercent = (percent: number) => {
  if (percent <= 0.02) return 0
  else if (percent >= 0.98) return 1
  return percent
}
