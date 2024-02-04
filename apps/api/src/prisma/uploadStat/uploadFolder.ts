import fs from "node:fs"
import path from "node:path"
import { createFolder, createFile } from "../Stat"
import { formatPathname } from "../../utils/formatPathname"
import { config } from "./config"
import { uuid } from "../../utils/uuid"
import { extractPath } from "shared-utils"
import { type PrismaMediaType } from "../../types/Media"
import type { UploadFolderOption, CreateFunction } from "./types"

async function uploadFolder({
  folderPath,
  option,
  permissionUtil,
  ignore = "",
}: UploadFolderOption) {
  let rootDir: string
  if (!path.isAbsolute(folderPath)) {
    rootDir = path.resolve(folderPath)
  } else {
    rootDir = folderPath
  }
  if (!fs.existsSync(rootDir)) {
    throw new Error(`no such folder ${rootDir}`)
  }

  const response = await createFolder("$root$", {
    pathname: "/",
    name: "$root$",
    label: "$root$",
  })

  function ext2MeidaType(ext: string) {
    for (const key in option) {
      const value = option[key as keyof typeof option]
      if (value?.ext.includes(ext)) return value.name
    }
    return "audio"
  }

  readFolder(rootDir)

  async function readFolder(folderPath: string) {
    if (Boolean(ignore) && folderPath.includes(ignore)) return
    const contents = fs.readdirSync(folderPath)
    for (const item of contents) {
      const itemPath = path.join(folderPath, item)
      const relativePath = formatPathname(
        path.relative(rootDir, itemPath),
        true
      )
      const dirname = formatPathname(path.dirname(relativePath), true)

      const stats = fs.statSync(itemPath)
      if (stats.isFile()) {
        const id = uuid()
        const mediaType = ext2MeidaType(
          extractPath(relativePath).ext || ""
        ) as Exclude<PrismaMediaType, "folder" | "image" | "unknown">

        const createInput = await option[mediaType]?.create({
          pathname: relativePath,
          label: item,
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const createFunction = config[mediaType].create as any
        const encodePathname = encodeURI(relativePath)
        const response = await createFunction({
          ...createInput,
          fileId: id,
        })

        if (!response) {
          throw new Error("")
        }
        const permission = permissionUtil ? permissionUtil(relativePath) : null
        const fileResponse = await createFile(dirname, {
          pathname: encodePathname,
          name: item,
          type: mediaType,
          fileId: id,
          permission,
        })
      } else if (stats.isDirectory()) {
        const id = uuid()
        console.log("dir", relativePath)
        const encodePathname = encodeURI(relativePath)
        const permission = permissionUtil ? permissionUtil(relativePath) : null
        const response = await createFolder(dirname, {
          folderId: id,
          pathname: encodePathname,
          name: item,
          label: item,
          permission,
        })
        await readFolder(itemPath)
      }
    }
  }
}

export default uploadFolder
