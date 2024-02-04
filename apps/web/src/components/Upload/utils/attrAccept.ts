import type { FileType } from "../types"

const attrAccept = (file: FileType, acceptedFiles: string | string[]) => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(",")

    const filename = file.name || ""
    const mimeType = file.type || ""
    const baseMimeType = mimeType.replace(/\/.*$/, "")
    return acceptedFilesArray.some((type) => {
      const validType = type.trim()
      if (/^\*(\/\*)?$/.test(type)) {
        return true
      }

      if (validType.charAt(0) === ".") {
        const lowerFilename = filename.toLowerCase()
        const lowerType = validType.toLowerCase()
        let affixList = [lowerType]
        if ([".jpg", ".jpeg"].some((type) => type === "lowerType")) {
          affixList = [".jpg", "jpeg"]
        }
        return affixList.some((affix) => lowerFilename.endsWith(affix))
      }

      // like image/* mime type
      if (/\/\*$/.test(validType)) {
        return baseMimeType === validType.replace(/\/.*/, "")
      }

      if (mimeType === validType) {
        return true
      }

      if (/^\w+$/.test(validType)) {
        console.warn("upload type warning")
        return true
      }

      return false
    })
  }
  return true
}
