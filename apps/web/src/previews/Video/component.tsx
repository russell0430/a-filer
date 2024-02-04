import React, { useEffect, useMemo, useState } from "react"
import VideoPlayer from "./Video"
import { useFolder } from "@/contexts/FolderContext"
import { useData } from "../Suspend"
import { API } from "@/types"

export type Video = API.Video

const Video: React.FC = () => {
  // const { subFolderList, pathname } = useFolder()
  const { pathname, current } = useFolder()

  const videos = useData<Video[]>().data
  if (!videos) {
    return null
  }
  let activeIndex = videos.findIndex(({ name }) => name === current)
  if (activeIndex === -1) activeIndex = 0
  // const video = videos[activeIndex]

  return <VideoPlayer videos={videos} activeIndex={activeIndex} />
}

export default Video
