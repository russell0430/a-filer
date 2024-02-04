import { Router } from "express"
import mediaRouter from "./mediaRouter"
import folderRouter from "./folderRouter"

const router = Router()

router.use(mediaRouter)
router.use(folderRouter)
export default router