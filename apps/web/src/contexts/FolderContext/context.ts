// import { MediaType } from "@shared/types/Media"
// import { FolderType, FileType } from "@shared/types/Stat"

import { Media as MediaType, FolderType, FileType } from "api"

export type Stat = {
  type: MediaType | "folder"
  size: number
  createdAt: string
  updatedAt: string
}
type FolderNaviagte = (
  params:
    | {
        type: "media"
        mediaType: MediaType | "folder"
        name: string
        refresh?: boolean
      }
    | { type: "folder"; pathname: string }
) => void

type FolderObject = {
  name: string
  folder: string
  folderNavigate: FolderNaviagte
  // fileList: File[]
}

// choose a obj type, and all the objects in folder list are the same type
export interface FolderContextObject extends FolderObject {
  isLoading: boolean
  isForbidden: boolean
  subFolderList: FolderType[]
  current: string | null
  fileList: FileType[]
  type: MediaType | "folder"
  currentFolderId: string | null
  filename?: string
  pathname: string
}
