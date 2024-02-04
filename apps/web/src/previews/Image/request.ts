import { requests } from "../../request/api"
import type { Image } from "./component"
import { RequestFunction } from "../types"

const { get } = requests

export type FetchImageRequest = RequestFunction<Image[]>

const fetchImageRequest: FetchImageRequest = async ({ folderId, pathname }) => {
  const response = await get(`/api/image/folder/${folderId}`)
  const data = await response.json()
  console.log(data)
  return { status: response.status, data }
}

export default fetchImageRequest
