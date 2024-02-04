import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { findDOMNode } from "react-dom"
import screenfull from "screenfull"
import ReactPlayer from "react-player"
import { OnProgressProps } from "react-player/base"
import { VideoPlayerProps } from "./types"
import { IoPlay, IoPause, IoVolumeMedium, IoVolumeMute } from "react-icons/io5"
import { AiFillPlayCircle } from "react-icons/ai"
import { FaVectorSquare } from "react-icons/fa"
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai"
import { BiCollapseHorizontal, BiExpandHorizontal } from "react-icons/bi"
import Bar from "../Bar"
import { formatTime } from "shared-utils"
import clsx from "clsx"
import { debounce } from "@/utils"
import useKeyboard from "./useKeyboard"

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  listOpen = false,
  handleWithList,
  onVideoEnd,
  height: heightProp,
  width: widthProp,
}) => {
  const [percent, setPercent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const handleTogglePlaying = useCallback(() => setPlaying((val) => !val), [])

  const [volume, setVolume] = useState(video?.initialVolume || 0.2)
  const [muted, setMuted] = useState(false)

  const handleClickMuted: React.MouseEventHandler = useCallback((event) => {
    event.stopPropagation()
    setMuted((val) => !val)
  }, [])

  const [currentTime, setCurrentTime] = useState(0)
  const [loadedTime, setLoadedTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const videoPlayerWrapRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)

  const [isReady, setIsReady] = useState(false)
  const onReady = (player: ReactPlayer) => {
    setIsReady(true)
    setDuration(player.getDuration())
  }

  const onProgress = (state: OnProgressProps) => {
    setPercent(state.played)
    setCurrentTime(state.playedSeconds)
    setLoadedTime(state.loadedSeconds)
  }

  const onChangePeriod = (percent: number) => {
    //
    setPercent(percent)
    playerRef.current?.seekTo(percent)
  }

  // controller
  const [showController, setShowController] = useState(false)
  const showControllerSourceRef = useRef<"move" | "hover">()

  // left controller
  const [showVolume, setShowVolume] = useState(false)
  const hoverEnterVolume = () => {
    setShowVolume(true)
  }

  // right controller

  const [fullscreen, setFullscreen] = useState(false)
  const [pageFullscreen, setPageFullscreen] = useState(false)

  const onTogglePageFullscreen: React.MouseEventHandler<HTMLElement> =
    useCallback(
      (event) => {
        event.stopPropagation()
        setFullscreen(false)
        handleWithList && handleWithList(true)
        setPageFullscreen(!pageFullscreen)
      },
      [handleWithList, pageFullscreen]
    )

  const onToggleWithList: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation()
      handleWithList && handleWithList()
      setPageFullscreen(false)
      setFullscreen(false)
    },
    [handleWithList]
  )

  const onToggleFullscreen: React.MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.stopPropagation()
      setPageFullscreen(false)
      handleWithList && handleWithList(false)
      setFullscreen(!fullscreen)
    },
    [fullscreen, handleWithList]
  )

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])
  useLayoutEffect(() => {
    const domNode = findDOMNode(videoPlayerWrapRef.current) as Element
    if (fullscreen) {
      screenfull.request(domNode)
    } else {
      screenfull.exit()
    }
  }, [fullscreen])

  const onMouseMove = useCallback(
    debounce(
      () => {
        if (showControllerSourceRef.current === "hover") return
        setShowController(true)
      },
      () => {
        if (showControllerSourceRef.current === "hover") return
        setShowController(false)
      },
      1000
    ),
    []
  )

  const handleMouseEnterController = useCallback(() => {
    showControllerSourceRef.current = "hover"
    setShowController(true)
  }, [])

  const handleMouseLeaveController = useCallback(() => {
    showControllerSourceRef.current === "hover" &&
      setTimeout(() => {
        showControllerSourceRef.current === "hover" && setShowController(false)
        showControllerSourceRef.current = "move"
      }, 1000)
  }, [])

  const width = pageFullscreen ? "100%" : widthProp
  const height = pageFullscreen ? "100%" : heightProp

  useKeyboard(true, {
    keyRight: () => {
      setCurrentTime((current) => {
        const pendingCurrent = Math.min(current + 5, duration)
        playerRef.current?.seekTo(pendingCurrent, "seconds")
        return pendingCurrent
      })
    },
    keyLeft: () => {
      setCurrentTime((current) => {
        const pendingCurrent = Math.max(0, current - 5)
        playerRef.current?.seekTo(pendingCurrent, "seconds")
        return pendingCurrent
      })
    },
    keyBlank: handleTogglePlaying,
  })

  return (
    <div
      className={clsx(
        "h-full fullscreen",
        pageFullscreen
          ? "fixed w-screen h-screen top-0 left-0 z-10"
          : "relative flex justify-center"
      )}
      ref={videoPlayerWrapRef}
      onClick={handleTogglePlaying}
      onMouseMove={onMouseMove}
    >
      {!playing && isReady && (
        <div className=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 rounded-full">
          <AiFillPlayCircle
            className={`text-6xl text-gray-500 opacity-80 hover:opacity-100 hover:scale-110 cursor-pointer transition`}
          />
        </div>
      )}
      <ReactPlayer
        width={width || ""}
        height={height || ""}
        playing={playing}
        url={video?.url}
        volume={volume}
        muted={muted}
        ref={playerRef}
        style={
          pageFullscreen
            ? {
                position: "relative",
                display: "flex",
                alignItems: "center",
                zIndex: "49",
              }
            : { zIndex: "2", position: "relative" }
        }
        onReady={onReady}
        onProgress={onProgress}
        onEnded={onVideoEnd}
      />
      <div className="cover left-0 top-0 right-0 bottom-0 bg-black absolute z-0" />
      <div
        className={clsx(
          `player-controller bg-transparent transition-all bg-gray
          h-16 bottom-0 z-50`,
          fullscreen ? "fixed min-w-max w-screen" : "absolute w-full",
          showController ? "opacity-90" : "opacity-0"
        )}
        onMouseEnter={handleMouseEnterController}
        onMouseLeave={handleMouseLeaveController}
      >
        <Bar percent={percent} onChange={onChangePeriod} barWidth={4} />
        <div className="flex justify-between items-center text-gray-300">
          <div className="cursor-pointer p-2 rounded-full opacity-80 hover:opacity-100 transition">
            {playing ? <IoPause size={24} /> : <IoPlay size={24} />}
          </div>
          <div
            className={clsx(
              "p-2 flex cursor-pointer rounded-full box-border relative items-center"
            )}
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
          >
            <div onClick={handleClickMuted}>
              {muted || volume < 0.01 ? (
                <IoVolumeMute size={24} />
              ) : (
                <IoVolumeMedium size={24} />
              )}
            </div>
            <div
              className={clsx(
                "transition-all overflow-hidden relative h-full box-border",
                showVolume ? "w-16" : "w-0"
              )}
            >
              <div className="w-full px-2 relative">
                <Bar
                  percent={muted ? 0 : volume}
                  onChange={setVolume}
                  barWidth={4}
                />
              </div>
            </div>
          </div>
          <div>
            <span className="">{formatTime(currentTime)}</span>
            <span> / </span>
            <span className="">{formatTime(duration)}</span>
          </div>
          <div className="ml-auto"></div>
          {!fullscreen && (
            <div
              className="mx-2 cursor-pointer opacity-50 hover:scale-125 hover:opacity-100 transition-all"
              onClick={onToggleWithList}
            >
              {listOpen ? (
                <BiExpandHorizontal size={24} />
              ) : (
                <BiCollapseHorizontal size={24} />
              )}
            </div>
          )}
          {!fullscreen && (
            <div
              className="mx-2 cursor-pointer opacity-50 hover:scale-125 hover:opacity-100 transition-all"
              onClick={onTogglePageFullscreen}
            >
              {pageFullscreen ? (
                <AiOutlineFullscreenExit size={24} />
              ) : (
                <AiOutlineFullscreen size={24} />
              )}
            </div>
          )}
          <div
            className="mx-2 cursor-pointer opacity-50 hover:scale-125 hover:opacity-100 transition-all"
            onClick={onToggleFullscreen}
          >
            <FaVectorSquare size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
