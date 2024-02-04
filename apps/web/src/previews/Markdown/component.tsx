import MarkdownReader from "@/components/MarkdownReader"
import { useFolder } from "@/contexts/FolderContext"
import { useData } from "../Suspend"
import { API } from "@/types"

export type Markdown = API.Markdown

const Markdown = () => {
  const md = useData<Markdown>().data
  console.log(md?.name)

  return <div>{md ? <MarkdownReader url={md.url} /> : null}</div>
}

export default Markdown
