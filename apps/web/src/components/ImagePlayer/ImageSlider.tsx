import React, { ImgHTMLAttributes } from "react"

// check if is browser
const inBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
)


// check if support navtive lazy load
const supportNativeLazyLoading = "loading" in HTMLImageElement.prototype

interface ImageSliderProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> {
  fallbackSrc?: string
  fallbackReactNode?: React.ReactNode
  placeholderSrc?: string
  placeHolderReactNode?: React.ReactNode
}

const ImageSlider: React.FC<ImageSliderProps> = (props) => {
  const {
    style,
    alt: altProp,
    src: srcProp,
    srcSet: srcSetProp,
    loading,

    sizes,
    decoding,
    crossOrigin,
    referrerPolicy,

    fallbackSrc,
    placeholderSrc,
    onError,
    ...rest
  } = props
  const lazy = loading === "lazy"
  const useNativeLazyLoading = lazy && supportNativeLazyLoading && !placeholderSrc
  const useCustomLazyLoading = lazy && inBrowser && !useNativeLazyLoading
  const hasSource = !!srcProp || !!srcSetProp

  return <div>ImageSlider</div>
}

export default ImageSlider
