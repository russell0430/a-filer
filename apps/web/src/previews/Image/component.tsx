import React, { useEffect, useMemo, useState } from "react"
import { useData } from "../Suspend"
import { Swiper, SwiperSlide } from "@/components/swiper"
import { Image as ImageComponent } from "@/components/Images"
import { useFolder } from "@/contexts/FolderContext"
import { API } from "@/types"
export type Image = API.Image

const Image: React.FC = () => {
  const data = useData<Image[]>()
  const images = data.data
  const { fileList, current, folderNavigate, pathname } = useFolder()

  if (!images) {
    return null
  }
  let activeIndex = images.findIndex(({ name }) => name === current)
  if (activeIndex === -1) activeIndex = 0

  const beforeSlide = (index: number) => {
    const image = images?.[index]
    if (image) {
      folderNavigate({
        type: "media",
        mediaType: "image",
        name: image.name,
      })
    }
  }

  return (
    <div className="image h-full w-full relative">
      <Swiper initialActiveIndex={activeIndex} beforeSlide={beforeSlide}>
        {(images || []).map((image, index) => (
          <SwiperSlide key={`${image.fileId}}`} className="">
            <ImageComponent
              src={image.url}
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Image
