// import { decodeForwardslashes, replaceBackslashes } from "shared-utils"
import { RequestHandler } from "express"
import {
  findFolder,
  findItemByFolderId,
  findStatInFolder,
} from "../prisma/Stat"
import { isMediaType } from "../prisma/types"
import { checkPermission, deletePermission } from "./permission"
import { decodeForwardslashes, replaceBackslashes } from "shared-utils"
/**
 *
 * @param req
 * @param folder
 *
 * @description get folder intel by folder pathname like /abc
 *
 */
const folderHandler: RequestHandler<{ folderPathname: string }> = async (
  req,
  res
) => {
  const folder = decodeForwardslashes(req.params.folderPathname)
  const result = await findFolder(folder, false)
  if (!result.success) {
    return res.status(200).json(result).end()
  }
  return res.json({ success: true })
  // return res.redirect(`/api/folderContent/${result.data.folderId}`)
}

const folderContentHandler: RequestHandler<{
  resourceId: string
}> = async (req, res) => {
  const folder = replaceBackslashes(req.params.resourceId)

  const statResponse = await findStatInFolder(folder)
  if (statResponse.success) {
    const data = {
      ...statResponse.data,
      files: deletePermission(
        checkPermission(req.user?.role, statResponse.data.files || [])
      ),
      subFolders: deletePermission(
        checkPermission(req.user?.role, statResponse.data.subFolders || [])
      ),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (data as any)["permission"]
    console.log("send again")
    return res
      .status(200)
      .json({ ...statResponse, data })
      .end()
  } else {
    return res.status(500).json(statResponse).end()
  }
}

const folderMediaHandler: RequestHandler<{
  type: string
  resourceId: string
}> = async (req, res) => {
  const { type, resourceId } = req.params
  if (!resourceId) {
    const response = {
      success: false,
      msg: `no valid resource id`,
    }
    return res.status(200).json(response)
  }
  if (!isMediaType(type)) {
    const response = {
      success: false,
      msg: `type '${type}' is not legal type`,
    }
    return res.status(200).json(response)
  }
  const response = await findItemByFolderId(resourceId, type)
  return res.status(200).json(response)
}

export { folderHandler, folderContentHandler, folderMediaHandler }
