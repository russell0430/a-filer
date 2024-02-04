import React, { forwardRef, useEffect, useMemo, useRef } from "react"
import { SwiperProps, SwiperRef } from "./types"
import { getChildren } from "./utils/getChildren"
import { SwiperContext } from "./context"
import useSwiper from "./hooks/useSwiper"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import clsx from "clsx"
import Pagination from "./Pagination"

const Swiper = forwardRef<SwiperRef, SwiperProps>((props, externalRef) => {
  const {
    tag: Tag = "div",
    wrapperTag: WrapperTag = "div",
    initialActiveIndex = 0,
    beforeSlide,
    className,
    children,
  } = props

  const swiperRef = useRef()

  const wrapperElRef = useRef<HTMLElement>(null)
  const prevElRef = useRef<HTMLDivElement>(null)
  const nextElRef = useRef<HTMLDivElement>(null)
  const paginationElRef = useRef<HTMLDivElement>(null)
  const scrollbarElRef = useRef<HTMLDivElement>(null)

  const {
    activeIndex,
    length,
    slideTo,
    slideToNext,
    slideToPrev,
    slides,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  } = useSwiper({
    wrapperElRef,
    children,
    beforeSlide,
    initialActiveIndex,
  })

  const renderedSlides = useMemo(() => {
    return slides.map((child, index) =>
      React.cloneElement(child, {
        swiper: swiperRef.current,
        swiperSlideIndex: index,
      })
    )
  }, [slides])

  return (
    <Tag
      className={clsx(
        className,
        "swiper relative h-full w-full p-0 ml-auto mr-auto list-none z-1 block overflow-hidden bg-green-300"
      )}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <SwiperContext.Provider value={{ activeIndex }}>
        <WrapperTag
          ref={wrapperElRef}
          className={`relative w-full h-full z-1 flex transition-transform box-content ml-[-100%]`}
        >
          {renderedSlides}
        </WrapperTag>
        {
          <>
            <div
              ref={prevElRef}
              onClick={slideToPrev}
              className={`swiper-button-prev absolute flex justify-center items-center z-10 cursor-pointer left-0 top-[50%] translate-Y-[50%]`}
            >
              <AiOutlineLeft />
            </div>
            <div
              ref={nextElRef}
              onClick={slideToNext}
              className={`swiper-button-next absolute flex justify-center items-center z-10 cursor-pointer right-0 top-[50%] translate-Y-[50%]`}
            >
              <AiOutlineRight />
            </div>
          </>
        }
        {
          <div className="absolute bottom-2 right-2">
            {activeIndex + 1} / {slides.length - 2}
          </div>
        }
        {<div ref={scrollbarElRef} className="swiper-scrollbar" />}
        {
          <div
            ref={paginationElRef}
            className="swiper-pagination absolute bottom-2 w-1/3 left-[50%] translate-x-[-50%]"
          >
            <Pagination
              length={length}
              activeIndex={activeIndex}
              onSelectIndex={slideTo}
            />
          </div>
        }
      </SwiperContext.Provider>
    </Tag>
  )
})

export default Swiper
