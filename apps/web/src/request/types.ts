import { FileType, FolderType, Profile as User } from "api"

type Response<T = any> =
  | { success: true; data: T }
  | { success: false; msg?: string }
export type FetchResponse<T = any> = Promise<{
  status: number
  msg?: string
  data: Response<T>
}>

// login
export interface LoginOptions {
  username: string
  email: string
  password: string
}
export interface LoginRequest {
  (options: LoginOptions): FetchResponse<string>
}

// register
export interface RegisterOptions {
  username: string
  password: string
  email: string
}
export interface RegisterRequest {
  (options: RegisterOptions): FetchResponse<string>
}

export interface FetchMeRequest {
  (): FetchResponse<User>
}

// fetch file in folder and filter by ext name
export interface FetchContentOptions {
  folderPathname: string
}

export interface FetchContentRequest {
  (option: FetchContentOptions): FetchResponse<
    FolderType & {
      files?: FileType[]
      subFolders?: FolderType[]
    }
  >
}

export interface FetchMdUrl {
  (url: string): FetchResponse<string>
}

export interface FetchPermissionRequest {
  (params: { resourceId: string }): FetchResponse<boolean>
}
