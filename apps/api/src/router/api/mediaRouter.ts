import { Router } from "express"
import { medias } from "../../prisma/types"
import {
  filePermissionHandler,
  folderPermissionHandler,
} from "../../handlers/permission"
import { mediaFolderHandler, mediaHandler } from "../../handlers/mediaHandler"
const router = Router()
medias.forEach((media) => {
  router.get(
    `/${media}/:resourceId`,
    filePermissionHandler,
    mediaHandler(media)
  )
  router.get(
    `/${media}/folder/:resourceId`,
    folderPermissionHandler,
    mediaFolderHandler(media)
  )
})

export default router
