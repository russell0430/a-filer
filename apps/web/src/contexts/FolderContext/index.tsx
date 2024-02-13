import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { FolderContextObject } from "./context"
import { fetchContentByPathname } from "@/request"
import { useLocation, useNavigate } from "react-router-dom"
// import { ext2MediaType, extractPath } from "@shared/utils"
import { Media as MediaType, FileType, FolderType, ext2MediaType } from "api"
import { extractPath } from "shared-utils"
import { getPreviewConfig } from "@/previews/config"
import { useSearchParams } from "react-router-dom"
const FolderContext = React.createContext({} as FolderContextObject)

export const FolderContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isForbidden, setIsForbidden] = useState(false)

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  // const [searchParams, setSearchParams] = useSearchParams()

  const parsedPathname = extractPath(pathname)

  const { ext, filename, folder } = parsedPathname
  console.log(folder)

  const preview = (searchParams.get("preview") || undefined) as
    | MediaType
    | undefined
  const current = searchParams.get("current") || null

  console.log(searchParams.get("current"))

  const type: MediaType | "folder" =
    (ext && ext2MediaType(ext)) || preview || "folder"

  console.log(current, preview)

  const folderNavigate: FolderContextObject["folderNavigate"] = useCallback(
    (params: Parameters<FolderContextObject["folderNavigate"]>[0]) => {
      if (params.type === "folder") {
        navigate(params.pathname)
      } else if (params.type === "media") {
        const { name, mediaType } = params

        setSearchParams({
          current: name,
          preview: mediaType,
        })
        console.log(name, mediaType)
      }
    },
    [navigate, setSearchParams]
  )

  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [fileList, setFileList] = useState<FileType[]>([])
  const [subFolderList, setSubFolderList] = useState<FolderType[]>([])
  useEffect(() => {
    console.log("fetch", type, folder)
    const getFolderContent = async () => {
      setIsLoading(true)
      console.log("getFolderContent")
      try {
        const response = await fetchContentByPathname({
          folderPathname: folder,
        })
        console.log(response)
        if (response.status === 200 && response.data.success) {
          const data = response.data.data
          console.log(data)

          setCurrentFolderId(data.folderId || null)
          setFileList(data.files || [])
          if (type === "folder") {
            setSubFolderList(data.subFolders || [])
          }
        } else if (response.status === 403) {
          setIsForbidden(true)
        } else {
          console.log("error")
        }
      } catch (err) {
        console.log(err)
        setFileList([])
        setSubFolderList([])
        //
      } finally {
        console.log("finally")
        setIsLoading(false)
      }
    }
    getFolderContent()
  }, [folder, pathname, type])
  const value = useMemo(
    () => ({
      isLoading,
      isForbidden,
      name: folder,
      folder,
      folderNavigate,
      current,
      currentFolderId,
      fileList,
      type,
      subFolderList,
      filename,
      pathname,
    }),
    [
      isLoading,
      isForbidden,
      folder,
      folderNavigate,
      current,
      currentFolderId,
      fileList,
      type,
      subFolderList,
      filename,
      pathname,
    ]
  )
  return (
    <FolderContext.Provider value={value}>{children}</FolderContext.Provider>
  )
}

export const useFolder = (): FolderContextObject => useContext(FolderContext)
