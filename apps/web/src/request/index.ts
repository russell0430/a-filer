import { encodeForwardslashes } from "shared-utils"
import { requests } from "./api"
import {
  LoginRequest,
  RegisterRequest,
  FetchMeRequest,
  FetchMdUrl,
  FetchPermissionRequest,
  FetchContentRequest,
} from "./types"
const { get, post } = requests

export const login: LoginRequest = async ({ username, password, email }) => {
  //
  const response = await post(`/api/login`, {
    body: JSON.stringify({ username: email, password }),
  })
  const data = response.data
  return { status: response.status, data }
}

export const register: RegisterRequest = async ({
  username,
  email,
  password,
}) => {
  const response = await post(`/api/register`, {
    body: JSON.stringify({ username, password, email }),
  })
  const data = await response.data
  return { status: response.status, data }
}

export const fetchMe: FetchMeRequest = async () => {
  //
  const response = await get(`/api/me`)
  const data = await response.data
  return { status: response.status, data }
}

/**
 *
 * @folder pathname of folder like /abc
 * @returns
 */
export const fetchContentByPathname: FetchContentRequest = async ({
  folderPathname,
}) => {
  // console.log(folderPathname, encodeForwardslashes(folderPathname))
  const response = await get(
    `/api/folder/${encodeForwardslashes(folderPathname)}`
  )
  const data = await response.data
  console.log(data)
  return { status: response.status, data }
}

//

export const fetchMarkdownUrl: FetchMdUrl = async (url: string) => {
  const response = await fetch(url)
  const data = await response.text()
  return {
    status: response.status,
    data: { data, success: true },
  }
}

// get user id from jwt
export const fetchPermission: FetchPermissionRequest = async (params) => {
  const response = await get(`/api/permission`, { params })
  console.log("fetch permission")
  const data = await response.data
  console.log(data)
  return { status: response.status, data }
}
