// learnt from
// https://github.com/react-component/upload/blob/HEAD/src/AjaxUploader.tsx
import React, { useImperativeHandle, useRef, useState } from "react"
import {
  AjaxUploadProps,
  FileType,
  BeforeUploadFileType,
  ParsedFileInfo,
  UploadProgressEvent,
} from "./types"
import request from "./utils/request"
import getUid from "./utils/uid"
import clsx from "clsx"

export interface UploadRef {
  reset: () => void
  upload: () => void
}

const AjaxUpload: React.ForwardRefRenderFunction<UploadRef, AjaxUploadProps> = (
  props,
  ref
) => {
  const {
    className,
    multiple,
    disabled,
    action,
    method = "POST",
    data,
    name = "name",
    headers = {},
    beforeUpload,
    onBatchStart,
    onStart,
    onSuccess,
    onError,
    onProgress,
    children,
  } = props
  const [uid, setUid] = useState(getUid)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const reqsRef = useRef<Record<number, () => void>>({})

  const post = ({ data, origin, action, parsedFile }: ParsedFileInfo): void => {
    const requestOption = {
      file: parsedFile,
      action,
      filename: name,
      headers,
      method,
      onProgress: (e: UploadProgressEvent) => {
        onProgress?.(e, parsedFile)
      },
      onSuccess: (ret: any, xhr?: XMLHttpRequest) => {
        onSuccess?.(ret, parsedFile, xhr!)
      },
      onError,
    }
    onStart && onStart()
    // console.log(requestOption)
    reqsRef.current[1] = request(requestOption)
  }

  const processFile = async (file: FileType) => {
    let transformedFile: BeforeUploadFileType | void = file
    if (beforeUpload) {
      transformedFile = await beforeUpload(file)
    }
    const mergedData: Record<string, unknown> = data || {}

    const parsedData =
      typeof transformedFile === "object" ? transformedFile : file

    let parsedFile: File
    if (parsedData instanceof File) {
      parsedFile = parsedData
    } else {
      parsedFile = new File([parsedData], file.name, { type: file.type })
    }

    const mergedParsedFile = parsedFile as FileType
    mergedParsedFile.uid = file.uid

    return {
      origin: file,
      data: mergedData,
      parsedFile: mergedParsedFile,
      action,
    }
  }

  const uploadFile = (files: File[]) => {
    const originFiles = [...files] as FileType[]
    const postFiles = originFiles.map((file: FileType & { uid?: string }) => {
      file.uid = getUid()
      return processFile(file)
    })

    Promise.all(postFiles).then((fileList) => {
      onBatchStart?.()
      fileList
        .filter((file) => file.parsedFile !== null)
        .forEach((file) => post(file))
    })
  }

  // const onInternalFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault()
  //   if (e.type === "dragover") {
  //     return
  //   }

  //   let files = [...e.dataTransfer.files].filter((file:FileType)=>{

  //   })
  // }

  const onClick = () => {
    inputRef.current?.click()
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target.files || []) as File[]
    console.log(files)

    uploadFile([...files])
  }

  useImperativeHandle(ref, () => ({
    reset: () => setUid(getUid),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    upload: () => {},
  }))

  return (
    <div onClick={onClick} className={clsx(className, "cursor-pointer")}>
      <input
        type="file"
        name="file"
        ref={inputRef}
        style={{ display: "none" }}
        multiple={multiple}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

export default React.forwardRef(AjaxUpload)
