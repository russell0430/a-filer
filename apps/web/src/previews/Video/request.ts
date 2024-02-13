import { requests } from "../../request/api"
import type { FetchResponse } from "@/request/types"
import type { Video } from "./component"
import { RequestFunction } from "../types"
const { get, post } = requests

type FetchVideoRequest = RequestFunction<Video[]>
const fetchVideoRequest: FetchVideoRequest = async ({ folderId }) => {
  console.log(folderId)
  const response = await get(`/api/video/folder/${folderId}`)
  const data = await response.data
  console.log(data)
  return { status: response.status, data }
}

export default fetchVideoRequest
