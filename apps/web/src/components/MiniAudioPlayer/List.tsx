import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import List, { ListRef } from "@/components/lists/List.back"
import { Audio } from "../../previews/Audio/component"
import clsx from "clsx"

export interface MiniAudioListRef {
  current: HTMLElement | null
  getHeight: () => number
}

export interface MiniAudioListProps {
  handleChangeAudio: (audio: Audio) => void
  audios: Audio[]
  open?: boolean
  className?: string
}

const MiniAudioList = forwardRef<MiniAudioListRef, MiniAudioListProps>(
  ({ open = true, audios, handleChangeAudio, className }, externalRef) => {
    const [height, setHeight] = useState(0)
    const listRef = useRef<ListRef>(null)
    useEffect(() => {
      if (open) {
        // ref.current!.scrollTop = items.length * 33
        setHeight(listRef.current?.getHeight() || 0)
      } else {
        setHeight(0)
      }
    }, [open])
    const _handleChangeAudio: (audio: Audio) => React.MouseEventHandler =
      useCallback(
        (audio: Audio) => (event) => {
          event.stopPropagation()
          handleChangeAudio(audio)
        },
        [handleChangeAudio]
      )

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
export default List
