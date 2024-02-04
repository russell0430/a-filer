// login handler
// <reference path="../../types/express/index.d.ts" />
import { RequestHandler } from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import fs from "node:fs"
import path from "node:path"
const privateKeyPath = path.resolve(
  __dirname,
  "../../libs/cryptography/id_rsa_priv.pem"
)
const privateKey = fs.readFileSync(privateKeyPath)

const handler: RequestHandler = (req, res, next) => {
  //
  const authenticateCallback: passport.AuthenticateCallback = (
    err,
    user,
    info
  ) => {
    if (err) {
      return res.status(500).json({ msg: "Internal Error" }).end()
    }
    if (!user) {
      console.log(info)
      return res.status(401).json({ success: false, msg: "login failed" }).end()
    }

    req.login(user, function () {
      const token = jwt.sign(
        {
          sub: user.uid,
          username: user.username,
          iat: Date.now(),
          role: user.role,
        },
        privateKey,
        {
          algorithm: "RS256",
          expiresIn: "1d",
        }
      )

      return res.status(200).json({ token, success: true }).end()
    })
  }
  passport.authenticate("local", authenticateCallback)(req, res, next)
}
export default handler
