import { FileType, UploadFile } from "../types"

export const file2Obj = (file: FileType): UploadFile => ({
  ...file,
  percent: 0,
  originFileObj: file,
})
