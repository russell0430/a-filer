import clsx from "clsx"
import React, { useCallback, useMemo } from "react"

export interface PaginationProps {
  className?: string
  activeIndex: number
  length: number
  onSelectIndex?: (index: number) => void
}

const DefaultMaxLength = 5
const Pagination: React.FC<PaginationProps> = ({
  className,
  activeIndex,
  length,
  onSelectIndex,
}) => {
  const handleClickBullet: (index: number) => React.MouseEventHandler =
    useCallback(
      (index) => (event) => {
        event.stopPropagation()
        onSelectIndex && onSelectIndex(index)
      },
      [onSelectIndex]
    )

  const { startIndex, computedLength } = useMemo(() => {
    const computedLength = Math.min(DefaultMaxLength, length)
    const startIndex = Math.max(activeIndex - Math.floor(computedLength / 2), 0)
    return { startIndex, computedLength }
  }, [activeIndex, length])
  const bullets = useMemo(() => {
    return Array(computedLength)
      .fill(0)
      .map((_, index) => (
        <span
          className={clsx(
            "h-4 w-4 block rounded-full opacity-60 hover:opacity-100 hover:scale-110 transition mx-2 cursor-pointer",
            activeIndex === index ? "bg-red-600" : "bg-gray-600"
          )}
          onClick={handleClickBullet(startIndex + index)}
          key={index}
        ></span>
      ))
  }, [activeIndex, computedLength, handleClickBullet, startIndex])
  return (
    <div className={clsx(className, "pagination flex w-full justify-center")}>
      {bullets}
    </div>
  )
}

export default Pagination
