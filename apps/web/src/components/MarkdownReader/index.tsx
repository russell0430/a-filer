import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import "github-markdown-css"
import { fetchMarkdownUrl } from "@/request"
const MarkdownReader: React.FC<{ url: string }> = ({ url }) => {
  const [markdownString, setMarkdownString] = useState<string>("")

  useEffect(() => {
    if (!url) return
    const fetchMd = async () => {
      const res = await fetchMarkdownUrl(url)
      if (res.status === 200 && res.data.success) {
        console.log(res.data)
        setMarkdownString(res.data.data || "")
      } else {
        console.log("can not fetch")
      }
    }
    fetchMd()
  }, [url])
  return (
    <div className="">
      <ReactMarkdown children={markdownString} />
    </div>
  )
}

export default MarkdownReader
