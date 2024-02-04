import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import PopoverTop from "../popovers/PopoverTop"
import type { AudioPlayerProps } from "./types"
import clsx from "clsx"
import {
  IoPlaySkipForward,
  IoPlaySkipBack,
  IoPlay,
  IoPause,
  IoVolumeMute,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoList,
} from "react-icons/io5"
import { formatTime } from "@/utils"
import Bar from "../Bar"
import AudioList, { AudioListRef } from "./AudioList"
const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audio,
  handleChangeAudio,
  onAudioChange,
  volume,
  handleChangeVolume,
  isAudioPlaying,
  toggleIsAudioPlaying,
  currentTime,
  setCurrentTime,
  duration,
  onDurationChange,
  list = [],
}) => {
  const listRef = useRef<AudioListRef>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const percent = duration > 0.1 ? currentTime / duration : 0

  const [listOpen, setListOpen] = useState(false)
  const toggleListOpen = () => {
    setListOpen((open) => !open)
  }

  const handlePrev: React.MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (!audio) {
        console.log("no audio provided")
        return
      }
      const currentAudioIndex = list.findIndex(({ id }) => id === audio.id)
      const prevAudioIndex =
        currentAudioIndex <= 0 ? list.length - 1 : currentAudioIndex - 1
      const _changeAudio = () => {
        handleChangeAudio(list[prevAudioIndex])
      }
      if (onAudioChange) onAudioChange(prevAudioIndex, _changeAudio)
      else {
        _changeAudio()
      }
    },
    [audio, handleChangeAudio, list, onAudioChange]
  )
  const handleNext: React.MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (!audio) {
        console.log("no audio provided")
        return
      }
      const currentAudioIndex = list.findIndex(({ id }) => id === audio.id)
      const nextAudioIndex =
        currentAudioIndex <= list.length - 1 ? currentAudioIndex + 1 : 0
      const _changeAudio = () => {
        handleChangeAudio(list[nextAudioIndex])
      }
      if (onAudioChange) onAudioChange(nextAudioIndex, _changeAudio)
      else {
        _changeAudio()
      }
    },
    [audio, handleChangeAudio, list, onAudioChange]
  )

  return (
    <div
      ref={playerRef}
      className={clsx(
        "bg-white shadow-md rounded-xl relative flex flex-col max-h-full"
      )}
    >
      <div
        className={clsx(
          "relative bg-slate-400 h-28 w-full flex justify items-center z-10"
        )}
      >
        <div
          className={clsx(
            "button transition-all bg-green-50 h-28 w-28 relative shrink-0"
          )}
        >
          <div
            className={clsx(
              "bg-gray-300 rounded-full opacity-75 absolute p-1 cursor-pointer transition-all",
              isAudioPlaying
                ? "bottom-0 right-0 scale-75 m-1"
                : "scale-100 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            )}
            onClick={toggleIsAudioPlaying}
          >
            {isAudioPlaying ? <IoPause size={32} /> : <IoPlay size={32} />}
          </div>
        </div>
        <div className="flex flex-col justify-around h-full w-full">
          <div
            className={clsx("aplyer-music flex justify-between items-center")}
          >
            <div className="w-[480px] flex-1">
              <p className="title text-2xl font-medium leading-7 mx-2 truncate">
                {audio?.name || "No audio"}
              </p>
            </div>
            <div className="">
              <span className="right text-xl leading-5 mx-2">
                {audio?.author || "unknown"}
              </span>
            </div>
          </div>

          <div className="controller flex justify-between items-center mx-2 my-2">
            <div className="mx-2 flex-1">
              <Bar
                percent={percent}
                onChange={onDurationChange}
                bgColor="bg-gray-300"
                barColor="bg-red-300"
                barWidth={8}
                // reverse
              ></Bar>
            </div>

            <div className="time mx-1">
              <span className="time-inner text-md">
                <span className="time-ptime">{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span className="time-dtime">{formatTime(duration)}</span>
              </span>
            </div>
            <div
              className="rounded-full hover:bg-gray-300 hover:scale-110 transition cursor-pointer"
              onClick={handlePrev}
            >
              <IoPlaySkipBack size={24} />
            </div>
            <div
              className="rounded-full hover:bg-gray-300 hover:scale-110 transition cursor-pointer"
              onClick={toggleIsAudioPlaying}
            >
              {isAudioPlaying ? <IoPause size={24} /> : <IoPlay size={24} />}
            </div>
            <div
              className="rounded-full hover:bg-gray-300 hover:scale-110 transition cursor-pointer"
              onClick={handleNext}
            >
              <IoPlaySkipForward size={24} />
            </div>
            <div
              className="rounded-full hover:bg-gray-300 hover:scale-110 transition cursor-pointer"
              onClick={toggleListOpen}
            >
              <IoList size={24} />
            </div>
            <PopoverTop
              popoverAs={"div"}
              panel={
                <div className="h-12 w-4 flex justify-center items-center z-20 my-1">
                  <Bar
                    percent={volume}
                    onChange={handleChangeVolume}
                    barWidth={8}
                    direction="vertical"
                    bgColor="bg-gray-300"
                    barColor="bg-blue-300"
                    reverse
                  ></Bar>
                </div>
              }
              buttonAs={Fragment}
              button={
                <div className="volme-wrap hover:bg-gray-300 hover:scale-110 transition">
                  {volume === 0 ? (
                    <IoVolumeMute size={24} />
                  ) : (
                    <IoVolumeMedium size={24} />
                  )}
                </div>
              }
            ></PopoverTop>
          </div>
        </div>
      </div>

      <div className={clsx("aplayer-info overflow-auto w-full scrollbar-none")}>
        <AudioList
          open={listOpen}
          ref={listRef}
          className="grow transition"
          audios={list}
          handleChangeAudio={handleChangeAudio}
        />
      </div>
    </div>
  )
}

export default AudioPlayer
