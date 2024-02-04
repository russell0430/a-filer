import { Preview } from "../types"
import request from "./request"
import Video from "./component"
import { API } from "@/types"
const name = "video"
export type VideoData = API.Video
const previewConfig: Preview<VideoData[]> = {
  custom: false,
  pathType: "folder",
  type: name,
  name: "video",
  exts: "mp4",
  component: Video,
  request: request,
}

export default previewConfig
