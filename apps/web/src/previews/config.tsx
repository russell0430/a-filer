import { Preview } from "./types"
import audioConfig from "./Audio"
import folderConfig from "./Folder"
import videoConfig from "./Video"
import markdownConfig from "./Markdown"
import imageConfig from "./Image"
import { Media } from "api"

const previewConfig: Preview[] = []

function registerPreview<Props>(config: Preview<Props>) {
  previewConfig.push(config)
}

registerPreview(audioConfig)
registerPreview(folderConfig)
registerPreview(markdownConfig)
registerPreview(videoConfig)
registerPreview(imageConfig)

const getPreviewConfig = (selectedType: Media | "folder") => {
  return previewConfig.find(({ type }) => type === selectedType)
}

export { previewConfig, registerPreview, getPreviewConfig }
