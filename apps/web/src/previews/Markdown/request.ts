import { requests } from "../../request/api"
import type { Markdown } from "./component"
import { RequestFunction } from "../types"

const { get } = requests

type FetchMarkdownRequest = RequestFunction<Markdown>
const fetchMarkdownRequest: FetchMarkdownRequest = async ({
  folderId,
  fileId,
}) => {
  console.log(fileId)
  const response = await get(`/api/markdown/${fileId}`)
  const data = await response.data
  return { status: response.status, data: { ...data, data: data.data[0] } }
}

export default fetchMarkdownRequest
