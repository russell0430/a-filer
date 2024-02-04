// learnt from
// https://github.com/react-component/upload/blob/HEAD/src/AjaxUploader.tsx

// only support single file for now !
import React, { useRef, useState } from "react"
import AjaxUpload from "./AdaxUploader"
import {
  UploadProps,
  FileType,
  BeforeUploadFileType,
  ParsedFileInfo,
  UploadFile,
} from "./types"
import { file2Obj } from "./utils/file2Obj"
import { ProgressBar, ProgressCircle } from "../Progress"
import { AiOutlineUpload } from "react-icons/ai"
import clsx from "clsx"

const Upload: React.FC<UploadProps> = (props) => {
  const {
    className,
    name = "upload",
    shape = "round",
    iconRender,
    diabled = false,
    type,
    action,
    method = "POST",
    onChange,
  } = props

  const [file, setFile] = useState<UploadFile | null>(null)

  const onInternalChange = (
    pendingFile: UploadFile,
    event?: { percent?: number }
  ) => {
    setFile(pendingFile)
    console.log(pendingFile)

    onChange?.({ percent: event?.percent, file: pendingFile.originFileObj })
  }

  const onProgress = (e: { percent?: number }, file?: FileType) => {
    //
    if (!file) return
    console.log("progress")
    const targetItem = file2Obj(file)
    targetItem.status = "uploading"
    targetItem.percent = e.percent
    onInternalChange(targetItem, e)
  }

  const onSuccess = (e: { percent?: number }, file: FileType) => {
    const targetItem = file2Obj(file)
    targetItem.status = "done"
    targetItem.percent = 100
    onInternalChange(targetItem, e)
  }

  console.log(file?.percent)
  let renderIcon: React.ReactNode = null
  if (shape === "round") {
    if (file !== null) {
      const percent = (file?.percent || 0) / 100
      renderIcon = (
        <ProgressCircle
          percent={percent}
          size="large"
          // style={{ height: "100%", width: "100%" }}
        >
          <AiOutlineUpload
            className={clsx(
              percent === 1
                ? ""
                : "animate-[upload_3s_ease-in-out_infinite] animate-upload ",
              "h-[100%] w-[100%]"
            )}
          />
        </ProgressCircle>
      )
    } else {
      renderIcon = (
        <ProgressCircle percent={0} size="large">
          <AiOutlineUpload className="h-[100%] w-[100%]" />
        </ProgressCircle>
      )
    }
  } else if (shape === "bar") {
    renderIcon = (
      <div className="w-36 h-20 flex flex-col justify-around items-center p-2">
        <h2>upload</h2>
        <ProgressBar percent={0.6} barWidth={4} />
      </div>
    )
  }
  return (
    <AjaxUpload
      action={action}
      method={method}
      onProgress={onProgress}
      onSuccess={onSuccess}
    >
      {renderIcon}
    </AjaxUpload>
  )
}

export default Upload
