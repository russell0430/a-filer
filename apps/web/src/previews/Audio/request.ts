import { requests } from "../../request/api"
import type { Audio } from "./component"
import { RequestFunction } from "../types"
const { get, post } = requests

type FetchAudioRequest = RequestFunction<Audio[]>

const fetchAudioRequest: FetchAudioRequest = async ({ folderId }) => {
  const response = await get(`/api/audio/folder/${folderId}`)
  const data = await response.json()
  return { status: response.status, data }
}

export default fetchAudioRequest
