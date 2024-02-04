import React, { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import Image from "@/components/Images/Image"
import { IoList, IoPlay, IoPause, IoMusicalNote } from "react-icons/io5"
import type { Audio } from "../../previews/Audio/component"
import Circle from "@/components/Circle"
import List from "../AudioPlayer/AudioList"

export interface MiniAudioPlayerProps {
  audio: Audio | null
  isAudioPlaying: boolean
  handleChangeAudio: (audio: Audio) => void
  toggleIsAudioPlaying: () => void
  currentTime: number
  duration: number
  list?: Audio[]
}
const MiniAudioPlayer: React.FC<MiniAudioPlayerProps> = ({
  audio,
  isAudioPlaying,
  handleChangeAudio,
  toggleIsAudioPlaying,
  currentTime,
  duration,
  list,
}) => {
  const percent = duration > 0.1 ? currentTime / duration : 0
  const [listOpen, setListOpen] = useState(false)

  const toggleListOpen = useCallback(() => setListOpen((open) => !open), [])

  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="flex justify-around items-center w-full h-16 mt-2">
        <div className="bg-slate-400 rounded-full opacity-20 animate-[spin_7s_linear_infinite]">
          {audio?.cover ? (
            <Image src={audio.cover} />
          ) : (
            <div style={{ color: "red" }}>
              <IoMusicalNote size={32} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between items-start mr-auto ml-2">
          <div className="font-medium text-base">{audio?.name}</div>
          <div className="text-sm text-slate-500">
            {audio?.author || "unknown artist"}
          </div>
        </div>
        <div
          onClick={toggleIsAudioPlaying}
          // className="hover:bg-black hover:opacity-10 rounded-full"
        >
          <Circle percent={percent} size="small">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
              {isAudioPlaying ? <IoPause size={22} /> : <IoPlay size={22} />}
            </div>
          </Circle>
        </div>
        <div
          className="hover:bg-black hover:bg-opacity-30 rounded-full"
          onClick={toggleListOpen}
        >
          <IoList size={32} />
        </div>
      </div>
      {list && (
        <List
          className="flex-1 h-0 scrollbar-none"
          open={listOpen}
          audios={list}
          handleChangeAudio={handleChangeAudio}
        />
      )}
    </div>
  )
}

export default MiniAudioPlayer
