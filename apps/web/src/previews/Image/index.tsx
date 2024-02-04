import { Preview } from "../types"
import request from "./request"
import Image from "./component"

import { API } from "@/types"
export type ImageData = API.Image

const previewConfig: Preview<ImageData[]> = {
  custom: false,
  pathType: "folder",
  type: "image",
  name: "image",
  exts: ["jpg", "png"],
  component: Image,
  request: request,
}

export default previewConfig
