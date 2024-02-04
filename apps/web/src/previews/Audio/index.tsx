import { BasicPreview, Preview } from "../types"
import request from "./request"
import Audio from "./component"
import { API } from "@/types"
const name = "audio"
export type AudioData = API.Audio
const previewConfig: Preview<AudioData[]> = {
  custom: false,
  pathType: "folder",
  type: name,
  name: "audio",
  exts: "mp3",
  component: Audio,
  request: request,
}

export default previewConfig
