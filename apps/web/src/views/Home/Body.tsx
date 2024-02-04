import Breadcrumb from "@/components/Breadcrumb"
import { useFolder } from "@/contexts/FolderContext"
import Preview from "@/previews"
import { useMemo } from "react"

const Body = () => {
  const { folder = "" } = useFolder()
  const [breadcrumbItems, _] = useMemo(
    () =>
      folder
        .slice(1)
        .split("/")
        .filter(Boolean)
        .reduce<[{ title: string; key: string }[], string]>(
          ([items, prevPath], currentFolder, idx) => {
            const absolutePath = `${prevPath}${
              idx === 0 ? "" : "/"
            }${currentFolder}`
            items.push({ title: currentFolder, key: absolutePath })
            return [items, absolutePath]
          },
          [[], "/"]
        ),
    [folder]
  )

  return (
    <div className="h-full w-full flex flex-col relative">
      <div className="flex-shrink-0">
        <Breadcrumb items={breadcrumbItems} withHost />
      </div>
      <div className="relative flex-1 h-[0]">
        <Preview />
      </div>
    </div>
  )
}

export default Body
