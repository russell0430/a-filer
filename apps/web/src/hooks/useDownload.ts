import { useState, useRef } from "react"
interface Options {
  url: string
  onSuccess?: () => void
  onError?: () => void
}
const useDownload = ({ url: urlFromProps, onSuccess, onError }: Options) => {
  const urlRef = useRef(urlFromProps)
  urlRef.current = urlFromProps
  // has download
  const [progress, setProgress] = useState(0)
  // need download
  // in case of divide 0
  const [contentLength, setContentLength] = useState(0.1)

  // all above kB

  const download = async () => {
    try {
      console.log(urlRef.current)
      const response = await fetch(urlRef.current)
      if (!response.ok) {
        return onError?.()
      }

      const contentLengthFromHeader = parseInt(
        response.headers.get("Content-Length") || `${contentLength}`,
        10
      )
      setContentLength(contentLengthFromHeader)

      let download = 0
      const chunks = []

      const reader = response.body?.getReader()
      if (!reader) {
        onError?.()
        return
      }
      while (progress < contentLength) {
        const { done, value } = await reader.read()
        if (done) {
          onSuccess?.()
          break
        }
        download += value.length
        console.log(download)
        chunks.push(value)
        setProgress(download)
      }
      const blob = new Blob(chunks)
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "downloaded_file"
      a.style.display = "none"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(blobUrl)
    } catch (err) {
      onError?.()
    }
  }

  return { progress, download }
}

export default useDownload
