import { ImgHTMLAttributes, forwardRef, useRef, useState } from "react"
import useMergedRef from "./hooks/useMergedRef"
import usePersist from "./hooks/usePersist"

import useUpdate from "./hooks/useUpdate"
import useUnMount from "./hooks/useUnmount"
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect"
import { isBrowser as checkIsBrowser } from "@/utils"

const isBrowser = checkIsBrowser()

// check if support navtive lazy load
const supportNativeLazyLoading = "loading" in HTMLImageElement.prototype

interface ImageState {
  alt?: string
  src?: string
  srcSet?: string
  visibility?: "hidden"
}

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "children"> {
  fallback?: string
  placeholder?: string
}
const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
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

    fallback,
    placeholder,
    onError,
    ...rest
  } = props

  const lazy = loading === "lazy"
  const useNativeLazyLoading = lazy && supportNativeLazyLoading && !placeholder
  const useCustomLazyLoading = lazy && isBrowser && !useNativeLazyLoading
  const hasSource = !!srcProp || !!srcSetProp

  const [state, setState] = useState<ImageState>(() => {
    const alt: string | undefined = altProp
    let src: string | undefined
    let srcSet: string | undefined
    let visibility: "hidden" | undefined
    if (placeholder) {
      src = placeholder
    } else if (hasSource) {
      src = srcProp
      srcSet = srcSetProp
    } else if (fallback) {
      src = fallback
    }
    return { alt, src, srcSet, visibility }
  })
  const { alt, src, srcSet, visibility } = state

  function handleError(event: React.SyntheticEvent<HTMLImageElement>) {
    if (fallback && src !== fallback) {
      setState({ alt: altProp, src: fallback })
    }
    if (typeof onError === "function") {
      onError(event)
    }
  }

  const imageRef = useRef<HTMLImageElement>(null)
  const mergedRef = useMergedRef(imageRef, ref)

  const preloadRef = useRef<HTMLImageElement>()
  const clearPreload = usePersist(() => {
    if (preloadRef.current) {
      preloadRef.current.src = ""
      preloadRef.current.srcset = ""
      preloadRef.current.onload = null
      preloadRef.current = undefined
    }
  })

  // preload image resource
  const preloadSource = usePersist(() => {
    clearPreload()
    if (hasSource) {
      preloadRef.current = new window.Image()
      if (sizes !== undefined) preloadRef.current.sizes = sizes
      if (decoding !== undefined) preloadRef.current.decoding = decoding
      if (crossOrigin !== undefined)
        preloadRef.current.crossOrigin = crossOrigin
      if (referrerPolicy !== undefined)
        preloadRef.current.referrerPolicy = referrerPolicy
      if (srcProp) preloadRef.current.src = srcProp
      if (srcSetProp) preloadRef.current.srcset = srcSetProp

      if (preloadRef.current.complete) {
        setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
        return true
      } else {
        preloadRef.current.onload = () => {
          clearPreload()
          setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
        }
      }
    } else {
      setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
      return true
    }

    return false
  })

  // update
  const updateSource = usePersist(() => {
    clearPreload()
    if (placeholder) {
      if (!hasSource || !preloadSource()) {
        setState({ alt: altProp, src: placeholder })
      }
    } else if (hasSource) {
      setState({ alt: altProp, src: srcProp, srcSet: srcSetProp })
    } else if (fallback) {
      setState({ alt: altProp, src: fallback })
    }
  })

  //
  const observerRef = useRef<IntersectionObserver>()

  const clearObserver = usePersist(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = undefined
    }
  })

  const handleIntersect = usePersist((entries: IntersectionObserverEntry[]) => {
    const entry = entries && entries[0]
    if (entry && entry.isIntersecting) {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      updateSource()
    }
  })

  if (!observerRef.current && useCustomLazyLoading) {
    observerRef.current = new IntersectionObserver(handleIntersect)
  }

  useIsomorphicLayoutEffect(() => {
    if (useCustomLazyLoading && imageRef.current && observerRef.current) {
      observerRef.current.observe(imageRef.current)
    } else if (src === placeholder && hasSource) {
      preloadSource()
    }
  }, [])

  useUpdate(() => {
    clearObserver()
    if (useCustomLazyLoading) {
      observerRef.current = new IntersectionObserver(handleIntersect)
    }
  }, [useCustomLazyLoading])
  useUpdate(() => {
    if (useCustomLazyLoading && imageRef.current && observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current.observe(imageRef.current)
    } else {
      updateSource()
    }
  }, [srcProp, srcSetProp, fallback, placeholder, useCustomLazyLoading])

  useUnMount(() => {
    clearPreload()
    clearObserver()
  })
  return (
    <img
      {...{
        alt,
        src,
        ref: mergedRef,
        srcSet,
        sizes,
        style: { visibility, ...style },
        decoding,
        crossOrigin,
        referrerPolicy,
        key: fallback,
        onError: handleError,
        loading: lazy ? (useNativeLazyLoading ? "lazy" : undefined) : loading,
      }}
      {...rest}
    />
  )
})

export default Image
