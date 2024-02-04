// use passport.js to authenticate
import passport from "passport"
import { Request, Response, NextFunction, RequestHandler } from "express"
import { StrategyType } from "../libs/auth/types"

export type Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => NextFunction

export default (method: StrategyType): Authenticate => {
  const authenticate = passport.authenticate(method, { session: false })
  return authenticate
}

export const isUser: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({ msg: "You are not authorized!" })
  }
}

export const isAdmin: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    next()
  } else {
    res
      .status(401)
      .json({ msg: "You are not authorized to access admin resource" })
  }
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", (err: string, user: Express.User) => {
    if (err) return next(err)
    if (!user) {
      return next()
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) return err
      return next()
    })
  })(req, res, next)
}
