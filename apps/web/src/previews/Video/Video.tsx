import React, { useCallback, useEffect, useMemo, useState } from "react"
import VideoPlayer from "@/components/VideoPlayer"
import { useFolder } from "@/contexts/FolderContext"
import List from "@/components/lists/List.back"
import clsx from "clsx"
import { Switch } from "@headlessui/react"
import { API } from "@/types"

export type Video = API.Video

const Video: React.FC<{ videos: Video[]; activeIndex: number }> = ({
  videos,
  activeIndex,
}) => {
  const { pathname, current, folderNavigate } = useFolder()

  const [withList, setWithList] = useState(true)
  const [acp, setAcp] = useState(true)

  const toggleAcp = useCallback((val?: boolean) => {
    if (val !== undefined) {
      setAcp(val)
    } else {
      setAcp((val) => !val)
    }
  }, [])

  const video = videos[activeIndex]

  const handleToggleList = useCallback((val?: boolean) => {
    if (val !== undefined) {
      setWithList(val)
    } else setWithList((val) => !val)
  }, [])

  const handleChangeVideo = useCallback(
    (video: Video) => {
      folderNavigate({
        type: "media",
        mediaType: "video",
        name: video.name,
      })
    },
    [folderNavigate]
  )

  const handleVideoEnd = useCallback(() => {
    //
    if (!acp) return
    const pendingVideo = videos[activeIndex + 1]
    handleChangeVideo(pendingVideo)
  }, [acp, activeIndex, handleChangeVideo, videos])

  return (
    <div className="flex flex-col relative h-full ">
      <div className="text-2xl flex-none">
        {video?.label || video?.name || "unknown label"}
      </div>
      <div className="grow flex w-full h-0">
        <div
          className={clsx(
            withList
              ? "lg:w-[768px] xl:w-[960px] 2xl:w-[1280px] w-2/3"
              : "w-full"
          )}
        >
          <VideoPlayer
            listOpen={withList}
            video={video}
            handleWithList={handleToggleList}
            onVideoEnd={handleVideoEnd}
          />
        </div>
        {withList && (
          <div className="w-64 mx-auto flex flex-col h-full max-h-full">
            <div className="flex justify-between">
              <div className="">自动连播</div>
              <Switch
                checked={acp}
                onChange={toggleAcp}
                className={clsx(
                  "rounded-full h-6 w-12 inline-flex items-center transition",
                  !acp ? "bg-slate-400" : "bg-green-300"
                )}
              >
                <span
                  className={clsx(
                    !acp ? "translate-x-6" : "translate-x-[-3]",
                    `inline-block h-6 w-6 transform rounded-full bg-white transition`
                  )}
                />
              </Switch>
            </div>
            <List
              className="rounded-sm bg-slate-200 "
              dataSource={videos}
              active={activeIndex}
              rowKey="id"
              renderItem={({ item, index }) => {
                return (
                  <List.Item>
                    <div
                      className="flex h-8"
                      onClick={() => {
                        handleChangeVideo(item)
                      }}
                    >
                      <div className="px-2">{index}</div>
                      <div className="ml-auto truncate">
                        {item.label || item.name}
                      </div>
                    </div>
                  </List.Item>
                )
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Video
