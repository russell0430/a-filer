import clsx from "clsx"
import React, { useMemo } from "react"
export interface CircleProps {
  style?: React.CSSProperties
  size?: "large" | "default" | "small"
  percent: number
  children?: React.ReactNode
}
const Circle: React.FC<CircleProps> = ({
  style,
  size = "default",
  percent,
  children,
}) => {
  const dashArray = Math.PI * 80
  const dashOffset = (1 - percent) * dashArray

  const sizeCls = useMemo(
    () =>
      size === "large"
        ? "h-20 w-20"
        : size === "small"
        ? "h-10 w-10"
        : "h-16 w-16",
    [size]
  )
  return (
    <div className={clsx("relative ", sizeCls)} style={style}>
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="progress-background"
          r="40"
          cx="50"
          cy="50"
          stroke="black"
          strokeWidth="8"
          fill="none"
        />
        <circle
          className="progress-bar -rotate-90 origin-center"
          r="40"
          cx="50"
          cy="50"
          stroke="red"
          strokeWidth="8"
          fill="none"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute h-[100%] w-[100%] top-0 left-0">
        <div className="flex h-[100%] w-[100%] justify-center items-center">
          <div className="h-[60%] w-[60%] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Circle
