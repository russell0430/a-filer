import React, { useState } from "react"
import clsx from "clsx"
import { Switch } from "@headlessui/react"
type Item = {
  id: string | number
  label: string
  duration: number
  onClick: () => void
  active?: boolean
}
interface Props {
  acp: boolean
  toggleACP: (val?: boolean) => void
  activeIndex?: number
  label: string
  items: Item[]
}
const List: React.FC<Props> = ({
  items,
  label,
  activeIndex,
  acp,
  toggleACP,
}) => {
  // Automatic continuous playback
  return (
    <div className="bg-[#f1f2f3] rounded-md flex flex-col max-h-full">
      <div className="py-2 px-4 flex justify-between items-center border-b-2 border-collapse border-b-slate-300">
        {label} hello
        <Switch
          checked={acp}
          onChange={toggleACP}
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
      {/* <ol className="mx-2 px-2 my-2 py-2 rounded-sm overflow-y-auto flex-1 h-0">
        {items.map(({ id, label, onClick, active }, index) => (
          <li
            key={id}
            onClick={onClick}
            className={clsx(
              "flex justify-between items-center h-8 rounded-sm",
              active ? "bg-[#fff]" : ""
            )}
          >
            {active || (activeIndex && activeIndex === index) ? (
              <img
                src="//s1.hdslb.com/bfs/static/jinkela/video/asserts/playing.gif"
                className="h-4"
              />
            ) : null}
            <div className="text-ellipsis inline-block align-middle ml-1 mr-auto truncate">
              {label}
            </div>
            <div></div>
          </li>
        ))}
      </ol> */}
    </div>
  )
}

export default List
