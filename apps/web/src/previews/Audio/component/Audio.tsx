import React, { useCallback, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import AudioPlayer from "../../../components/AudioPlayer"
import useMediaQuery from "@/hooks/useMediaQuery"
import MiniAudioPlayer from "../../../components/MiniAudioPlayer"
import { useFolder } from "@/contexts/FolderContext"
import { API } from "@/types"

export type Audio = API.Audio
const Audio: React.FC<{ activeIndex: number; audios: Audio[] }> = ({
  activeIndex,
  audios,
}) => {
  const audio = audios[activeIndex]

  const { folderNavigate, pathname, current } = useFolder()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(0.3)

  const [isAudioReady, setIsAudioReady] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(audio?.duration || 0)

  const matches = useMediaQuery("(min-width:750px)")

  const handleChangeAudio = useCallback(
    (audio: Audio) => {
      folderNavigate({ type: "media", mediaType: "audio", name: audio.name })
    },
    [folderNavigate]
  )

  const handleCanPlay = useCallback(() => {
    console.log("handle can play")
    setIsAudioReady(true)
    setDuration(audioRef.current?.duration || duration)
  }, [duration])

  const toggleIsAudioPlaying = useCallback(
    () => setIsAudioPlaying((val) => !val),
    []
  )

  const handleDurationChange = useCallback(
    (per: number) => {
      const curTime = per * duration
      setCurrentTime(curTime)
      audioRef.current?.currentTime && (audioRef.current.currentTime = curTime)
    },
    [duration]
  )

  const handleTimeUpdate: React.ReactEventHandler<HTMLAudioElement> =
    useCallback((event) => {
      setCurrentTime(event.currentTarget.currentTime)
    }, [])

  const handleAudioEnd: React.ReactEventHandler<HTMLAudioElement> =
    useCallback(() => {
      //
      const pendingAudio = audios[activeIndex + 1]
      folderNavigate({
        type: "media",
        mediaType: "audio",
        name: pendingAudio.name,
      })
    }, [activeIndex, audios, folderNavigate])

  const handleChangeVolume = useCallback((pendingVolume: number) => {
    audioRef.current && (audioRef.current.volume = pendingVolume)
    setVolume(pendingVolume)
  }, [])

  useEffect(() => {
    if (isAudioPlaying) {
      audioRef.current?.play().catch(() => {
        setIsAudioPlaying(false)
      })
    } else {
      audioRef.current?.pause()
    }
  }, [isAudioPlaying])

  useEffect(() => {
    setIsAudioReady(false)
    setIsAudioPlaying(false)
  }, [activeIndex])

  useEffect(() => {
    setIsAudioPlaying(true)
  }, [isAudioReady])

  const handlePrev: React.MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (!audio) {
        console.log("no audio provided")
        return
      }
      const currentAudioIndex = audios.findIndex(({ id }) => id === audio.id)
      const prevAudioIndex =
        currentAudioIndex <= 0 ? audios.length - 1 : currentAudioIndex - 1
      folderNavigate({
        type: "media",
        mediaType: "audio",
        name: audios[prevAudioIndex].name,
      })
    },
    [audio, audios, folderNavigate]
  )
  const handleNext: React.MouseEventHandler = useCallback(
    (event) => {
      event.stopPropagation()
      if (!audio) {
        console.log("no audio provided")
        return
      }
      const currentAudioIndex = audios.findIndex(({ id }) => id === audio.id)
      const nextAudioIndex =
        currentAudioIndex <= audios.length - 1 ? currentAudioIndex + 1 : 0
      folderNavigate({
        type: "media",
        mediaType: "audio",
        name: audios[nextAudioIndex].name,
      })
    },
    [audio, audios, folderNavigate]
  )

  const onAudioChange = useCallback(
    (index: number, _: () => void) => {
      folderNavigate({
        type: "media",
        mediaType: "audio",
        name: audios[index].name,
      })
    },
    [audios, folderNavigate]
  )

  return (
    <div className={clsx("h-full w-full box-border py-2")}>
      {matches ? (
        <AudioPlayer
          audio={audio || null}
          handleChangeAudio={handleChangeAudio}
          volume={volume}
          handleChangeVolume={handleChangeVolume}
          isAudioPlaying={isAudioPlaying}
          toggleIsAudioPlaying={toggleIsAudioPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          onAudioChange={onAudioChange}
          onDurationChange={handleDurationChange}
          list={audios}
        />
      ) : (
        <MiniAudioPlayer
          audio={audio || null}
          isAudioPlaying={isAudioPlaying}
          handleChangeAudio={handleChangeAudio}
          toggleIsAudioPlaying={toggleIsAudioPlaying}
          currentTime={currentTime}
          duration={duration}
          list={audios}
        />
      )}
      {audio && (
        <audio
          src={audio.url}
          ref={audioRef}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnd}
        />
      )}
    </div>
  )
}

export default Audio
