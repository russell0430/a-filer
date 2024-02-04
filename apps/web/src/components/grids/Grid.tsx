import Image from "../Images/Image"
import React, { useMemo } from "react"
import { IoFolder, IoDocumentTextOutline } from "react-icons/io5"
type Item = {
  id: string | number
  label: React.ReactNode
  onClick?: () => void
  append?: React.ReactNode
  active?: boolean
  image?: string
  icon?: React.ReactNode
  isDir: boolean
}
interface GridProps {
  items: Item[]
}

const Grid: React.FC<GridProps> = ({ items }) => {
  const gridItems = useMemo(
    () =>
      items.map(({ label, onClick, image, id, isDir, icon }) => (
        <li
          className="mx-4 my-4 rounded-2xl bg-gray-200 hover:scale-110 transition h-24 w-24 cursor-pointer flex flex-col items-center place-self-center"
          key={id}
          onClick={onClick}
        >
          <div className="w-16 h-16 flex justify-center items-center">
            {image ? (
              <Image src={image} />
            ) : icon ? (
              icon
            ) : isDir ? (
              <IoFolder size={36} />
            ) : (
              <IoDocumentTextOutline size={36} />
            )}
          </div>
          <p className="text-xl text-center w-full truncate">{label}</p>
        </li>
      )),
    [items]
  )
  return (
    <div className="h-full bg-slate-100 rounded-md">
      <ol className="grid grid-cols-[repeat(auto-fill,minmax(8rem,_1fr))]">
        {gridItems}
      </ol>
    </div>
  )
}

export default Grid
