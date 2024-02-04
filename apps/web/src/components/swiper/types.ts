export interface SlideData {
  isActive: boolean
  isVisbile: boolean
  isPrev: boolean
  isNext: boolean
}

export interface SwiperProps extends React.HtmlHTMLAttributes<HTMLElement> {
  tag?: JSX.ElementType
  wrapperTag?: JSX.ElementType
  initialActiveIndex?: number
  beforeSlide?: (index: number) => void
}

export interface SwiperRef {}

export interface SwiperSlideProps {
  tag?: JSX.ElementType
  className?: string
  swiperSlideIndex?: number
  children?: React.ReactNode | ((slideData: SlideData) => React.ReactNode)
}
