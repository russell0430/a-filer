import React, { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import AudioPlayer from "./Audio"
import { useFolder } from "@/contexts/FolderContext"

import { useData } from "../../Suspend"
import { API } from "@/types"

export type Audio = API.Audio
const Audio: React.FC = () => {
  const { current } = useFolder()
  const audios = useData<Audio[]>().data

  if (!audios) {
    return null
  }
  let activeIndex = audios.findIndex(({ name }) => name === current)
  if (activeIndex === -1) activeIndex = 0

  return <AudioPlayer activeIndex={activeIndex} audios={audios}></AudioPlayer>
}

export default Audio
