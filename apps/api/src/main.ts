import express from "express"
import passport from "passport"
import fs from "node:fs"
import path from "node:path"
import cors from "./middlewares/cors"
import router from "./router"
import { constructStrategy } from "./libs/auth"
import { ExtractJwt } from "passport-jwt"

const resolvedPath = path.resolve(
  __dirname,
  "./libs/cryptography/id_rsa_pub.pem"
)

const PUB_KEY = fs.readFileSync(resolvedPath, "utf-8")
async function main() {
  const app = express()
  app.use(cors({ cors: "*" }))
  app.use(express.json())
  //   passport.use()
  app.use(passport.initialize())
  passport.use(
    constructStrategy({
      strategy: "JWT",
      strategyOptions: {
        secretOrKey: PUB_KEY,
        algorithms: ["RS256"],
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      },
    })
  )
  passport.use(
    constructStrategy({
      strategy: "LOCAL",
    })
  )
  app.use(router)
  app.use("/index", (req, res) => {
    res.send("hello world")
  })

  // static files
  // app.use(express.static(path.resolve(__dirname, "../../resources")))
  app.listen(3000, () => {
    console.log("listening on port 3000")
  })
  return app
}
export default main()
