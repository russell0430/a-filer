import { Request, Response, NextFunction, RequestHandler } from "express"

export default (config: { cors?: string[] | "*" }): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    if (config.cors) {
      res.header("Access-Control-Allow-Methods", "POST, GET")
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Encoding"
      )
      console.log("write wild card")
      res.header("Content-Type", "application/json")
      if (config.cors === "*") {
        res.setHeader("Access-Control-Allow-Origin", "*")
      } else if (
        Array.isArray(config.cors) &&
        req.headers.origin &&
        config.cors.indexOf(req.headers.origin) > -1
      ) {
        res.header("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin)
      }
    }
    if (req.method === "OPTIONS") {
      return res.end()
    }
    return next()
  }
