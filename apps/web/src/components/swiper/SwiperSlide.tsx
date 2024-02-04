import React, { forwardRef } from "react"
import { SwiperSlideProps } from "./types"
import { useSwiperContext } from "./context"
import clsx from "clsx"

const SwiperSlide: React.ForwardRefRenderFunction<null, SwiperSlideProps> = (
  props,
  ref
) => {
  const { tag: Tag = "div", children, swiperSlideIndex, className } = props
  const { activeIndex } = useSwiperContext()
  return (
    <Tag
      className={clsx(
        "swiper-slide shrink-0 w-full h-full relative transition-transform",
        className
      )}
      ref={ref}
    >
      {typeof children === "function"
        ? children({
            isActive: activeIndex === swiperSlideIndex,
            isVisbile: activeIndex === swiperSlideIndex,
            isPrev: activeIndex - 1 === swiperSlideIndex,
            isNext: activeIndex + 1 === swiperSlideIndex,
          })
        : children}
    </Tag>
  )
}

export default forwardRef(SwiperSlide)
