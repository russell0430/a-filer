import { ImgHTMLAttributes, forwardRef, useRef, useState} from "react"
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
  node?: React.ReactNode
  renderNode: boolean
}

interface ImageProps
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    "children" | "placeholder"
  > {
  preload?: boolean
  fallbackSrc?: string
  placeholderSrc?: string
  fallbackNode?: React.ReactNode
  placeholderNode?: React.ReactNode
}

const CustomLazyImage = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => {
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

      preload = true,
      fallbackSrc,
      fallbackNode,
      placeholderSrc,
      placeholderNode,
      onError,
      ...rest
    } = props

    const lazy = loading === "lazy"
    const hasPlaceholder = !!placeholderSrc || !!placeholderNode
    const hasFallback = !!fallbackSrc || !!fallbackNode
    const useNativeLazyLoading =
      lazy && supportNativeLazyLoading && !hasPlaceholder
    const useCustomLazyLoading = lazy && isBrowser && !useNativeLazyLoading
    const hasSource = !!srcProp || !!srcSetProp

    const [state, setState] = useState<ImageState>(() => {
      const alt: string | undefined = altProp
      let src: string | undefined
      let srcSet: string | undefined
      let visibility: "hidden" | undefined
      let node: React.ReactNode | undefined
      let renderNode: boolean | undefined = false
      if (hasPlaceholder) {
        if (placeholderSrc) {
          src = placeholderSrc
        } else if (placeholderNode) {
          renderNode = true
          node = placeholderNode
        }
        console.log("placeholder")
      } else if (hasSource) {
        src = srcProp
        srcSet = srcSetProp
      } else if (hasFallback) {
        if (fallbackSrc) {
          src = fallbackSrc
        } else if (fallbackNode) {
          renderNode = true
          node = fallbackNode
        }
      }
      return { alt, src, srcSet, visibility, node, renderNode }
    })

    const { alt, src, srcSet, visibility, node, renderNode } = state

    function handleError(event: React.SyntheticEvent<HTMLImageElement>) {
      console.log("error", srcProp, fallbackSrc)
      if (hasFallback && srcProp !== fallbackSrc) {
        setState({
          alt: altProp,
          src: fallbackSrc,
          renderNode: !fallbackSrc,
          node: fallbackNode,
        })
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
        preloadRef.current.onerror = null
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
        preloadRef.current.onerror = (error) => {
          console.log("preload")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handleError(error as unknown as any)
        }

        if (preloadRef.current.complete) {
          console.log("complete")
          setState({
            alt: altProp,
            src: srcProp,
            srcSet: srcSetProp,
            renderNode: false,
          })
          return true
        } else {
          preloadRef.current.onload = () => {
            clearPreload()
            console.log("loaded")
            setState({
              alt: altProp,
              src: srcProp,
              srcSet: srcSetProp,
              renderNode: false,
            })
          }
        }
      } else {
        setState({
          alt: altProp,
          src: srcProp,
          srcSet: srcSetProp,
          renderNode: !placeholderSrc,
          node: placeholderNode,
        })
        return true
      }

      return false
    })

    // update
    const updateSource = usePersist(() => {
      clearPreload()
      if (placeholderSrc) {
        if (!hasSource || !preloadSource()) {
          setState({
            alt: altProp,
            src: placeholderSrc,
            node: placeholderNode,
            renderNode: false,
          })
        }
      } else if (hasSource) {
        console.log("has source")
        // setState({
        //   alt: altProp,
        //   src: srcProp,
        //   srcSet: srcSetProp,
        //   renderNode: false,
        // })
        preloadSource()
      } else if (fallbackSrc) {
        setState({
          alt: altProp,
          src: fallbackSrc,
          renderNode: !fallbackSrc,
          node: fallbackNode,
        })
      }
    })

    useIsomorphicLayoutEffect(() => {
      if (src === placeholderSrc && hasSource && preload) {
        preloadSource()
      }
    }, [preload])

    useUpdate(updateSource, [
      srcProp,
      srcSetProp,
      fallbackSrc,
      fallbackNode,
      placeholderSrc,
      placeholderNode,
      useCustomLazyLoading,
    ])

    console.log(renderNode, src)

    useUnMount(() => {
      clearPreload()
      // clearObserver()
    })

    if (renderNode) return node

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
          key: fallbackSrc,
          onError: handleError,
          loading: lazy ? (useNativeLazyLoading ? "lazy" : undefined) : loading,
        }}
        {...rest}
      />
    )
  }
)

export default CustomLazyImage