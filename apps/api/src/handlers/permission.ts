// <reference path="../../types/express/index.d.ts" />
import { RequestHandler } from "express"
import prisma from "../libs/prisma"
import { PickOptional } from "shared-types"
import { FileType } from "../prisma/Stat/types"

export const deletePermission = <
  T extends {
    permission?: { private: boolean; authorizedRoles: string[] } | null
  },
>(
  filesOrFolders: T[]
): Omit<T, "permission">[] => {
  return filesOrFolders.map((val) => {
    delete val["permission"]
    return val
  })
}

export const checkPermission = <
  T extends {
    permission?: { private: boolean; authorizedRoles: string[] } | null
  },
>(
  role: string | null | undefined,
  files: T[]
): T[] => {
  return files.filter((file) => {
    const permission = file.permission
    if (!permission || !permission.private) {
      return true
    }
    if (!role) {
      return false
    }
    return permission.authorizedRoles.includes(role)
  })
}
const filePermissionHandler: RequestHandler<{ resourceId: string }> = async (
  req,
  res,
  next
) => {
  const resourceId = req.params.resourceId
  if (!resourceId) {
    return res.status(200).json({ success: false, msg: "no valid resource id" })
  }

  let files: PickOptional<FileType, "permission">[] =
    await prisma.file.findMany({
      where: {
        fileId: { in: resourceId.split(",").filter(Boolean) },
      },
    })
  const user = req.user
  if (user?.role)
    files = checkPermission(user?.role, files) as PickOptional<
      FileType,
      "permission"
    >[]
  if (files.length > 0) next()
  else {
    return res.status(403).json({ success: true, data: false })
  }
}

const folderPermissionHandler: RequestHandler<{ resourceId: string }> = async (
  req,
  res,
  next
) => {
  const resourceId = req.params.resourceId
  const folder = await prisma.folder.findUnique({
    where: {
      folderId: resourceId,
    },
  })
  const user = req.user
  console.log(user, folder?.permission)
  if (!folder?.permission || !folder.permission.private) {
    return next()
  }
  if (!user?.role) {
    console.log("401")
    return res.status(401).json({ success: true, data: false }).end()
  }
  if (folder.permission.authorizedRoles.includes(user.role)) {
    console.log("next")
    return next()
  } else {
    return res.status(403).json({ success: true, data: false }).end()
  }
}

export { filePermissionHandler, folderPermissionHandler }
