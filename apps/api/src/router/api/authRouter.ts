import { Router } from "express"
import loginHandler from "../../handlers/authHandlers/loginHandler"
import registerHandler from "../../handlers/authHandlers/registerHandler"
const router = Router()

router.post("/login", loginHandler)
router.post("/register", registerHandler)

export default router
