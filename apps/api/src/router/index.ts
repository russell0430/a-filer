import { Router } from "express"
import mediaRouter from "./api/mediaRouter"
import apiRouter from "./api/authRouter"
import folderRouter from "./api/folderRouter"
const router = Router()

router.use("/api", mediaRouter)
router.use("/api", apiRouter)
router.use("/api", folderRouter)
router.get("/api/index", (req, res) => {
  res.send("hello world").end()
})
export default router
