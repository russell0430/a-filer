import React, { forwardRef, useMemo } from "react"

import CustomLazyImage from "./CustomLazyImage"

interface imgProp {
  src: string
  alt?: string
  fallbackSrc?: string
  fallbackNode?: React.ReactNode
  placeholderSrc?: string
  placeholderNode?: React.ReactNode
}

interface ImageGroupProps {
  imgs: imgProp[]
  defaultFallbackSrc?: string
  defaultFallbackNode?: React.ReactNode
  defaultPlaceholderSrc?: string
  defaultPlaceholderNode?: React.ReactNode
}

interface ImageGroupRef {}

const ImageGroup = forwardRef<ImageGroupRef, ImageGroupProps>(
  (props, externalRef) => {
    const {
      imgs,
      defaultFallbackNode,
      defaultFallbackSrc,
      defaultPlaceholderNode,
      defaultPlaceholderSrc,
    } = props

    return (
      <div>
        {imgs.map((img, key) => (
          <CustomLazyImage
            src={img.src}
            key={img.src}
            fallbackSrc={img.fallbackSrc || defaultFallbackSrc}
            fallbackNode={img.fallbackNode || defaultFallbackNode}
            placeholderSrc={img.placeholderSrc || defaultPlaceholderSrc}
            placeholderNode={img.placeholderNode || defaultPlaceholderNode}
          />
        ))}
      </div>
    )
  }
)

export default ImageGroup
