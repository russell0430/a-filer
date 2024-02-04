import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react"
import { BarProps, SyntheticEvent } from "./types"
import clsx from "clsx"
import { getGlobalOffset, isMobile, nameMap, roundEdgePercent } from "./utils"

const Bar: React.FC<BarProps> = ({
  className,
  percent,
  direction = "horizontal",
  reverse = false,
  dragable = false,
  onChange,
  style,
  barWidth: barWidthProp = 20,
  bgColor = "bg-black",
  barColor = "bg-gray-300",
  btnIcon = (
    <div className="btn-icon w-3 h-3 rounded-full relative ring-4 ring-red-600 bg-white" />
  ),
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const barProgressRef = useRef<HTMLDivElement>(null)
  const barPlayedRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)

  const [isPending, startTransition] = useTransition()
  // the phase of the first render, barOffsetRef.current = 0
  // the bar Length is used to refresh the component by useLayoutEffect
  const [barLength, setBarLength] = useState(0)

  const resizeObserverRef = useRef<ResizeObserver | null>(null)
  useLayoutEffect(() => {
    resizeObserverRef.current = new ResizeObserver(([entry]) => {
      startTransition(() => {
        setBarLength(
          direction === "horizontal"
            ? entry.contentRect.width
            : entry.contentRect.height
        )
      })
    })
    resizeObserverRef.current.observe(barRef.current!)
    return () => resizeObserverRef.current?.disconnect()
  }, [direction])

  const touchStateRef = useRef(false)
  const offset = Math.round(percent * barLength)

  const barWidth =
    typeof barWidthProp === "string" ? barWidthProp : `${barWidthProp}px`

  const onDragStart = (e: SyntheticEvent) => {
    if (!isMobile) e.preventDefault()
    if (!dragable) return
    touchStateRef.current = true

    document.addEventListener(
      nameMap.dragMove.slice(2).toLowerCase() as keyof DocumentEventMap,
      onDragMove as (e: Event) => void
    )
    document.addEventListener(
      nameMap.dragEnd.slice(2).toLowerCase() as keyof DocumentEventMap,
      onDragEnd as (e: Event) => void
    )
    console.log("start")
  }

  const onDragMove = useCallback(
    (e: SyntheticEvent) => {
      if (!isMobile) e.preventDefault()
      if (!touchStateRef.current) return
      const { x, y } = getGlobalOffset(e)

      const {
        left = 0,
        right = 0,
        top = 0,
        bottom = 0,
        height = 0,
        width = 0,
      } = barProgressRef.current?.getBoundingClientRect() || {}

      let pendingOffset = 0
      if (direction === "horizontal") {
        let deltaX = x - left
        deltaX = reverse ? width - deltaX : deltaX
        pendingOffset = Math.min(Math.max(deltaX, 0), barLength)
      } else {
        let deltaY = y - top
        deltaY = reverse ? height - deltaY : deltaY
        pendingOffset = Math.min(Math.max(deltaY, 0), barLength)
      }

      const pendingPercent = pendingOffset / barLength
      onChange && onChange(roundEdgePercent(pendingPercent))
    },
    [barLength, direction, onChange, reverse]
  )

  const onDragEnd = useCallback(
    (e: SyntheticEvent) => {
      if (!isMobile) e.preventDefault()
      touchStateRef.current = false

      document.removeEventListener(
        nameMap.dragMove.slice(2).toLowerCase() as keyof DocumentEventMap,
        onDragMove as (e: Event) => void
      )

      document.removeEventListener(
        nameMap.dragEnd.slice(2).toLowerCase() as keyof DocumentEventMap,
        onDragEnd as (e: Event) => void
      )
    },
    [onDragMove]
  )

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const rect = barProgressRef.current?.getBoundingClientRect()
    let pendingOffset
    if (direction === "horizontal") {
      pendingOffset = Math.min(
        Math.max(e.clientX - (rect?.left || 0), 0),
        barLength
      )
    } else {
      pendingOffset = Math.min(
        Math.max(e.clientY - (rect?.top || 0), 0),
        barLength
      )
    }
    const pendingPercent = pendingOffset / barLength
    onChange && onChange(reverse ? 1 - pendingPercent : pendingPercent)
  }

  return (
    <div
      className={clsx(
        className,
        bgColor,
        "bar relative flex justify-center items-center rounded-md cursor-pointer my-2",
        direction === "horizontal" ? `w-full` : `h-full`
      )}
      style={{
        ...style,
        ...(direction === "horizontal"
          ? {
              height: barWidth,
            }
          : { width: barWidth }),
      }}
      onClick={onClick}
      ref={barRef}
    >
      <div
        className={clsx(
          "bar-played transition",
          direction === "horizontal" ? "w-full" : "h-full"
        )}
        ref={barProgressRef}
      >
        <div
          className={clsx(
            barColor,
            "rounded-md transition-all absolute",
            direction === "horizontal" ? `w-full` : `h-full`,
            direction === "horizontal"
              ? reverse
                ? "right-0 top-0"
                : "left-0 top-0"
              : reverse
              ? "bottom-0 left-0"
              : "top-0 left-0"
          )}
          ref={barPlayedRef}
          style={
            direction === "horizontal"
              ? {
                  height: barWidth,
                  width: `${offset}px`,
                }
              : {
                  width: barWidth,
                  height: `${offset}px`,
                }
          }
        />
      </div>
      {dragable && (
        <div
          className={clsx(
            "bar-btn-wrap absolute transition",
            direction === "horizontal"
              ? reverse
                ? "right-0"
                : "left-0"
              : reverse
              ? "bottom-0"
              : "top-0"
          )}
          style={{
            transform:
              direction === "horizontal"
                ? `translate3d(${reverse ? -offset : offset}px,0,0)`
                : `translate3d(0,${reverse ? -offset : offset}px,0)`,
          }}
          ref={btnRef}
          {...{
            [nameMap.dragStart]: onDragStart,
          }}
        >
          <div
            className={clsx(
              `cursor-pointer scale-75 hover:scale-100 focus:scale-110
               flex justify-center items-center`,
              direction === "horizontal"
                ? reverse
                  ? "translate-x-[50%]"
                  : "translate-x-[-50%]"
                : reverse
                ? "translate-y-[50%]"
                : "translate-y-[-50%]"
            )}
          >
            {btnIcon}
          </div>
        </div>
      )}
    </div>
  )
}
export default Bar
