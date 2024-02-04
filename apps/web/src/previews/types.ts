import { Media } from "api"
import { FetchResponse } from "@/request/types"

export interface RequestParams {
  pathname: string
  fileId: string
  folderId: string
}

export interface BasicProps {
  isLoading: boolean
  error: Error
}

export type RequestFunction<Data = unknown, Params = RequestParams> = (
  params: Params
) => FetchResponse<Data>

export interface BasicPreview {
  name: string
  exts: string[] | string
  type: Media | "folder"
  pathType: "folder" | "file"
  component: React.ComponentType
}

export type DefaultPreview<Data> = BasicPreview & {
  custom: false
  request: RequestFunction<Data, RequestParams>
}

export type CustomPreview = BasicPreview & {
  custom: true
}

export type Preview<Data = unknown> = DefaultPreview<Data> | CustomPreview
