import { BasicPreview, CustomPreview, Preview } from "../types"
import Folder from "./component"

const previewConfig: Preview<"folder"> = {
  custom: true,
  type: "folder",
  pathType: "file",
  name: "folder",
  exts: ".",
  component: Folder,
}

export default previewConfig
