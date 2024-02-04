// learnt from https://github.com/react-component/upload

export type UploadRequestMethod = "POST" | "PUT"

interface UploadEvent {
  //   status: "NotStart" | "Progress" | "End"
  percent?: number
  method?: UploadRequestMethod
  url?: string
}

export type UploadFileStatus = "error" | "done" | "uploading" | "removed"

export interface UploadFile<T = any> {
  uid: string
  size?: number
  name: string
  fileName?: string
  lastModify?: number
  lastModifyDate?: Date
  url?: string
  status?: UploadFileStatus
  percent?: number
  originFileObj?: FileType
}

export type BeforeUploadFileType = File | Blob | boolean | string
export interface ParsedFileInfo {
  origin: FileType
  action: string
  data: Record<string, unknown>
  parsedFile: FileType
}

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number
}

export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}

export interface UploadRequestOption<T = any> {
  filename?: string
  file?: File | Blob | string
  data?: Record<string, unknown>
  method?: UploadRequestMethod
  action: string
  withCredentials?: boolean
  headers?: Record<string, string>
  onProgress?: (event: UploadEvent, file?: FileType) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void
}

export interface AjaxUploadProps {
  className?: string
  name?: string
  method?: UploadRequestMethod
  action: string
  data?: Record<string, unknown>
  headers?: Record<string, string>
  disabled?: boolean
  multiple?: boolean
  beforeUpload?: (
    file: FileType
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>
  children?: React.ReactNode
  onBatchStart?: () => void
  onStart?: () => void
  onSuccess?: (
    response: Record<string, unknown>,
    file: FileType,
    xhr: XMLHttpRequest
  ) => void
  onError?: () => void
  onProgress?: (e: UploadEvent, file?: FileType) => void
}

export interface FileType extends File {
  uid: string
}

export interface UploadProps {
  className?: string
  name?: string
  shape?: "round" | "bar"
  iconRender?: React.ReactNode
  diabled?: boolean
  type: string
  action: string
  method?: UploadRequestMethod
  onChange?: (params: { percent?: number; file?: FileType }) => void
}
