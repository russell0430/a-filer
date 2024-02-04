import { Router } from "express"
import mediaRouter from "./api/mediaRouter"
import apiRouter from "./api/authRouter"
import folderRouter from "./api/folderRouter"
const router = Router()

router.use("/api", mediaRouter)
router.use("/api", apiRouter)
router.use("/api", folderRouter)
export default router
