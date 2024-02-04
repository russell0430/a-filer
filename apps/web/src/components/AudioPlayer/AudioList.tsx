import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
} from "react"
import List, { ListRef } from "@/components/lists/List.back"
import clsx from "clsx"
import { API } from "@/types"


interface AudioListProps {
  audios: API.Audio[]
  handleChangeAudio: (audio: API.Audio) => void
  className?: string
  open?: boolean
}
export interface AudioListRef {
  current: HTMLElement | null
  getHeight: () => number
}

const AudioList = forwardRef<AudioListRef, AudioListProps>(
  ({ audios, className, open = true, handleChangeAudio }, externalRef) => {
    const listRef = useRef<ListRef>(null)
    useEffect(() => {
      if (open) {
        // ref.current!.scrollTop = items.length * 33
        setHeight(listRef.current?.getHeight() || 0)
      } else {
        setHeight(0)
      }
    }, [open])
    const [height, setHeight] = useState(0)

    const _handleChangeAudio: (audio: API.Audio) => React.MouseEventHandler =
      useCallback(
        (audio: API.Audio) => (event) => {
          event.stopPropagation()
          handleChangeAudio(audio)
        },
        [handleChangeAudio]
      )

    useImperativeHandle(externalRef, () => ({
      current: listRef?.current ? listRef.current.element() : null,
      getHeight: () => listRef.current?.getHeight() || 0,
    }))

    return (
      <div
        style={{ maxHeight: `${height}px` }}
        className={clsx(
          "block transition-all",
          open ? "overflow-y-scroll scrollbar-none" : "overflow-hidden",
          className
        )}
      >
        <List
          ref={listRef}
          dataSource={audios}
          rowKey="id"
          renderItem={({ item, index, active }) => (
            <List.Item>
              <div
                className="flex items-center justify-between h-8 px-4"
                onClick={_handleChangeAudio(item)}
              >
                <div className="h-6 w-6 rounded-full bg-slate-400 text-center">
                  {active ? "h" : index}
                </div>
                <div className="ml-4 mr-auto">{item.name}</div>
              </div>
            </List.Item>
          )}
        />
      </div>
    )
  }
)
export default AudioList
