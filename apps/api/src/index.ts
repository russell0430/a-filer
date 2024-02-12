import express, { RequestHandler } from "express"
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
// const app = express()
// app.use(cors({ cors: "*" }))
// app.use(express.json())
// //   passport.use()
// app.use(passport.initialize())
// passport.use(
//   constructStrategy({
//     strategy: "JWT",
//     strategyOptions: {
//       secretOrKey: PUB_KEY,
//       algorithms: ["RS256"],
//       jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//     },
//   })
// )
// passport.use(
//   constructStrategy({
//     strategy: "LOCAL",
//   })
// )
// app.use(router)
// app.get("/", (req, res) => {
//   res.send("hello world")
// })

// static files
// app.use(express.static(path.resolve(__dirname, "../../resources")))
const app: RequestHandler = (req, res) => {
  const { name = "World" } = req.query
  res.send(`Hello ${name}!`)
}
export default app