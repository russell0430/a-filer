import { createContext, useContext } from "react"

// export const SwiperSlideContext = createContext(null)
// export const useSwiperSlideContext = () => useContext(SwiperSlideContext)

interface Swiper {
  activeIndex: number
}

export type SwiperContext = Swiper

export const SwiperContext = createContext<SwiperContext>({} as SwiperContext)
export const useSwiperContext = () => useContext(SwiperContext)
