import React, { useMemo } from "react"
import { getPreviewConfig } from "./config"
import LoadingWrapper from "./Suspend"
import { useFolder } from "@/contexts/FolderContext"

const Preview: React.FC = () => {
  const { type } = useFolder()

  let preview: React.ReactNode = <div>unknown</div>
  const previewConfig = useMemo(() => getPreviewConfig(type), [type])

  preview =
    (previewConfig && (
      <LoadingWrapper config={previewConfig}></LoadingWrapper>
    )) ||
    preview

  return preview
}

export default Preview
