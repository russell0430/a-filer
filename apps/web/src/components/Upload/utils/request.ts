import {
  UploadProgressEvent,
  UploadRequestError,
  UploadRequestOption,
} from "../types"

const getError = (option: UploadRequestOption, xhr: XMLHttpRequest) => {
  const msg = `cannot ${option.method} ${xhr.status}`
  const err = new Error(msg) as UploadRequestError
  err.status = xhr.status
  err.method = option.method
  err.url = option.action
  return err
}

const getBody = (xhr: XMLHttpRequest) => {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const voidFunction = () => {}
const upload = (option: UploadRequestOption) => {
  const {
    onError = voidFunction,
    onProgress = voidFunction,
    onSuccess = voidFunction,
    method = "POST",
    action,
    headers = {},
    file,
    data = {},
    filename = "unknwon file",
    withCredentials = false,
  } = option
  const xhr = new XMLHttpRequest()

  if (xhr.upload) {
    xhr.upload.onprogress = (e: UploadProgressEvent) => {
      console.log("xhr upload onprogress", e.loaded)
      if (e.total && e.total > 0) {
        e.percent = ((e.loaded || 0) / e.total) * 100
      }
      onProgress(e)
    }
  }

  const formData = new FormData()

  Object.keys(data).forEach((key) => {
    const value = data[key]
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(`${key}[]`, item)
      })
      return
    }
    formData.append(key, value as string | Blob)
  })

  if (file instanceof Blob) {
    formData.append("file", file, (file as any).name)
  } else {
    formData.append(filename, file || "")
  }
  xhr.onerror = (e) => {
    console.log(e)
    onError(e)
  }

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return (
        option.onError && option.onError(getError(option, xhr), getBody(xhr))
      )
    }
    return onSuccess(getBody(xhr))
  }

  xhr.open(method, action, true)
  if (withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true
  }

  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
  }

  Object.keys(headers).forEach((h) => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h])
    }
  })

  xhr.send(formData)

  return () => xhr.abort()
}

export default upload
