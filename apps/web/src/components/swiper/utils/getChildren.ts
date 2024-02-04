import React from "react"
import SwiperSlide from "../SwiperSlide"

type SwiperSlideType = typeof SwiperSlide

const isChildSwiperSlide = (child: React.ReactElement) =>
  child.type === SwiperSlide

export const getChildren = (
  children: React.ReactNode | React.ReactNode[]
): React.ReactElement[] => {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .filter(isChildSwiperSlide)
}
