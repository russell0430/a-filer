import clsx from "clsx"
import React, { CSSProperties, ElementType, forwardRef } from "react"
// reference
// https://juejin.cn/post/6997011443967066143

type ScrollContainerRef = HTMLElement

interface ScrollContainerProps {
  className?: string
  children: React.ReactNode
  as: ElementType
  withScrollbar?: boolean
  withBorder?: boolean
  style?: CSSProperties
}
const ScrollContainer: React.ForwardRefRenderFunction<
  ScrollContainerRef,
  ScrollContainerProps
> = (
  { children, className, as = "div", withScrollbar = false, style = {} },
  ref
) => {
  return React.createElement(
    as,
    {
      className: clsx(
        className,
      //   ` bg-gray-300 overflow-y-auto w-full
      // scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100 
      // scrollbar-corner-white scrollbar-thumb-rounded-md scrollbar-w-2`,
      //   withScrollbar && "scrollbar-none"
      ),
      style: style,
      ref,
    },
    children
  )
}

export default forwardRef(ScrollContainer)
