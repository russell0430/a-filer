import React, {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { getChildren } from "../utils/getChildren"
import { SlideData } from "../types"
import Item from "../Item"
import { useArrayRef } from "./useArrayRef"

const Threshould = 0.3

interface SwiperOption {
  initialActiveIndex?: number
  beforeSlide?: (index: number) => void
  children?: React.ReactNode[] | React.ReactNode
  wrapperElRef: React.MutableRefObject<HTMLElement | null>
}

type TouchState = {
  isTouch: boolean
  startTranslate: number
  startPageX: number
  slideWidth: number
  translate: number
}

const useSwiper = (option: SwiperOption) => {
  const { initialActiveIndex = 0, beforeSlide, wrapperElRef, children } = option

  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const childrenSlides = useMemo(() => getChildren(children), [children])
  const slideLength = childrenSlides.length

  const { setInstanceRef, instanceRef } = useArrayRef()

  const slides = useMemo(() => {
    if (slideLength == 0) return []
    const first = React.cloneElement(childrenSlides[0], {
      key: `${childrenSlides[0].key}-index-first`,
    })

    const last = React.cloneElement(childrenSlides[slideLength - 1], {
      key: `${childrenSlides[slideLength - 1].key}-index-last`,
    })
    return [last, ...childrenSlides, first].map((item, index) => (
      <Item
        key={`${item.key}-index`}
        setRef={(ele) => setInstanceRef(index, ele)}
      >
        {item}
      </Item>
    ))
  }, [childrenSlides, setInstanceRef, slideLength])

  const touchStateRef = useRef<TouchState>({
    isTouch: false,
    slideWidth: 100,
    startPageX: 0,
    startTranslate: 0,
    translate: 0,
  })

  const slideTo = useCallback(
    (index: number) => {
      beforeSlide && beforeSlide(index)
      setActiveIndex(index)
    },
    [beforeSlide]
  )

  useEffect(() => {
    if (wrapperElRef.current) {
      wrapperElRef.current.style.transition = "0.5s"
      if (!touchStateRef.current.isTouch) {
        console.log("reshape")
        wrapperElRef.current.style.transform = `translateX(-${activeIndex}00%)`
      }
    }
  }, [activeIndex, wrapperElRef])

  const slideToPrev = useCallback(() => {
    if (activeIndex === 0) {
      //
      if (wrapperElRef.current) {
        wrapperElRef.current.style.transition = "none"
        wrapperElRef.current.style.transform = `translateX(-${slideLength}00%)`
        wrapperElRef.current.clientHeight
        slideTo(slideLength - 1)
      }
    } else {
      slideTo(activeIndex - 1)
      //
    }
  }, [activeIndex, slideLength, slideTo, wrapperElRef])
  console.log(activeIndex)

  const slideToNext = useCallback(() => {
    if (activeIndex === slideLength - 1) {
      //
      if (wrapperElRef.current) {
        wrapperElRef.current.style.transform = `translateX(100%)`
        wrapperElRef.current.style.transition = "none"

        wrapperElRef.current.getClientRects()
        slideTo(0)
      }
    } else {
      slideTo(activeIndex + 1)
      //
    }
  }, [activeIndex, slideLength, slideTo, wrapperElRef])

  const handleTouchStart: React.TouchEventHandler = useCallback(
    (event) => {
      if (wrapperElRef.current) wrapperElRef.current.style.transition = "none"
      touchStateRef.current.isTouch = true
      touchStateRef.current.startPageX = event.touches[0].pageX
      touchStateRef.current.slideWidth =
        wrapperElRef.current?.clientWidth || touchStateRef.current.slideWidth

      touchStateRef.current.startTranslate = -activeIndex * 100
    },
    [activeIndex, wrapperElRef]
  )
  const handleTouchMove: React.TouchEventHandler = useCallback(
    (event) => {
      if (!touchStateRef.current.isTouch) return
      const pendingPageX = event.touches[0].pageX
      const offset = pendingPageX - touchStateRef.current.startPageX
      if (
        Math.abs(offset) / touchStateRef.current.slideWidth > Threshould &&
        wrapperElRef.current
      ) {
        //
        if (offset > 0) {
          if (activeIndex === 0) {
            // wrapperElRef.current!.style.transition = "none"
            wrapperElRef.current.style.transform = `translateX(${
              -slideLength * 100 +
              100 * (offset / touchStateRef.current.slideWidth)
            }%)`
            wrapperElRef.current?.getClientRects()
            slideTo(slideLength - 1)
          } else {
            slideTo(activeIndex - 1)
          }
        } else {
          if (activeIndex === slideLength - 1) {
            // wrapperElRef.current!.style.transition = "none"
            wrapperElRef.current.style.transform = `translateX(${
              100 + 100 * (offset / touchStateRef.current.slideWidth)
            }%)`
            wrapperElRef.current?.getClientRects()
            slideTo(0)
          } else {
            slideTo(activeIndex + 1)
          }
        }
        touchStateRef.current.isTouch = false
      } else {
        //
        if (wrapperElRef.current) {
          touchStateRef.current.translate =
            touchStateRef.current.startTranslate +
            100 * (offset / touchStateRef.current.slideWidth)

          wrapperElRef.current.style.transform = `translateX(${touchStateRef.current.translate}%)`
        }
      }
    },
    [activeIndex, slideLength, slideTo, wrapperElRef]
  )

  const handleTouchEnd: React.TouchEventHandler = useCallback(
    (event) => {
      if (!touchStateRef.current.isTouch) return

      touchStateRef.current.isTouch = false
      if (wrapperElRef.current) {
        wrapperElRef.current.style.transition = "0.5s"
        wrapperElRef.current.style.transform = `translateX(${touchStateRef.current.startTranslate}%)`
      }
    },
    [wrapperElRef]
  )

  return {
    activeIndex,
    length: slideLength,
    slideTo,
    slideToNext,
    slideToPrev,
    slides,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}

export default useSwiper
