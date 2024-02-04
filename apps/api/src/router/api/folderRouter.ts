import { Router } from "express"
import {
  folderContentHandler,
  folderHandler,
  folderMediaHandler,
} from "../../handlers/folderHandler"
import { folderPermissionHandler } from "../../handlers/permission"

import { isAuthenticated } from "../../middlewares/authenticate"
// import { folderHandler } from "src/handlers/folderHandler"
// // `ext` can be folder here
const router = Router()

router.get("/folder/:folderPathname", folderHandler)
router.get(
  "/folderContent/:resourceId",
  isAuthenticated,
  folderPermissionHandler,
  folderContentHandler
)
router.get("/folderMeida/:resourceId/:type", folderMediaHandler)

export default router
