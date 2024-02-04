import React from "react"
import { useFolder } from "@/contexts/FolderContext"
import List from "@/components/lists/List.back"
import { Image } from "@/components/Images"
import Grid from "@/components/grids/Grid"
import Loading from "@/components/Loading"
import { useConfig } from "@/contexts/ConfigContext"
import { Media } from "api"
import { IoDocumentText, IoFolder } from "react-icons/io5"
type FolderItem = {
  id: string
  label: string
  name: string
  pathname: string
  image?: string
} & ({ isDir: false; type: Media } | { isDir: true })

const Folder: React.FC = () => {
  const { format } = useConfig()

  const grid = false
  const {
    isLoading,
    folderNavigate,
    subFolderList,
    fileList,
    isForbidden,
    pathname,
    current,
  } = useFolder()
  const folderItems = subFolderList.map((item) => ({
    ...item,
    label: item.label || item.name,
    isDir: true,
  }))
  const fileItems = fileList.map((item) => ({
    ...item,
    label: item.label || item.name,
    isDir: false,
  }))

  return (
    <div className="h-full w-full flex flex-col relative">
      <div className="grow relative">
        {isForbidden ? (
          <div>forbid</div>
        ) : isLoading ? (
          <div className="w-full h-full bg-green-50">
            <Loading />
          </div>
        ) : (
          <List<FolderItem>
            rowKey="id"
            // grid
            dataSource={[...folderItems, ...fileItems] as FolderItem[]}
            renderItem={({ item, index }) =>
              grid ? (
                <List.Item className="m-4 h-24 w-24 rounded-xl cursor-pointer flex flex-col items-center bg-gray-500 transition hover:scale-110">
                  <div
                    className="w-16 h-16 mx-auto flex justify-center items-center"
                    onClick={() => {
                      if (item.isDir) {
                        folderNavigate({
                          type: "folder",
                          pathname: item.pathname,
                        })
                      } else {
                        folderNavigate({
                          type: "media",
                          mediaType: item.type,
                          name: item.name,
                        })
                      }
                    }}
                  >
                    {item.image ? (
                      <Image src={item.image} />
                    ) : item.isDir ? (
                      <IoFolder size={36} />
                    ) : (
                      <IoDocumentText size={36} />
                    )}
                  </div>
                  <p className="text-xl text-center w-full truncate">
                    {item.label}
                  </p>
                </List.Item>
              ) : (
                <List.Item className="h-10 text-black bg-white hover:text-white hover:bg-black cursor-pointer my-1 rounded-md">
                  <div
                    onClick={() => {
                      if (item.isDir) {
                        folderNavigate({
                          type: "folder",
                          pathname: item.pathname,
                        })
                      } else {
                        folderNavigate({
                          type: "media",
                          mediaType: item.type,
                          name: item.name,
                        })
                      }
                    }}
                  >
                    <span className="leading-10 text-center mx-2">{index}</span>
                    <span className="leading-10 text-left">{item.label}</span>
                  </div>
                </List.Item>
              )
            }
          ></List>
        )}
      </div>
    </div>
  )
}

export default Folder
