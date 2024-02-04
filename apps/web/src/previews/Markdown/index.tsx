import { Preview } from "../types"
import request from "./request"
import Markdown from "./component"
import { API } from "@/types"
const name = "markdown"
export type MarkdownData = API.Markdown
const previewConfig: Preview<MarkdownData> = {
  custom: false,
  pathType: "file",
  type: name,
  name: "markdown",
  exts: "md",
  component: Markdown,
  request: request,
}

export default previewConfig
