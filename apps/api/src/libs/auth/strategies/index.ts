import { DatabaseActions, StrategyType } from "../types"
import { verifyCallback as jwtVerifyCallback } from "./jwt"
import { verifyCallback as localVerifyCallback } from "./local"
import { Strategy as PassportStrategy } from "passport-strategy"
import {
  Strategy as JwtStrategy,
  VerifyCallback as JwtVerifyuCallback,
} from "passport-jwt"
import {
  Strategy as LocalStrategy,
  VerifyFunction as LocalVerifyCallbck,
} from "passport-local"
import { VerifyCallback } from "./types"

export const getVerifyCallback = (strategy: StrategyType): VerifyCallback => {
  switch (strategy) {
    case "LOCAL":
      return localVerifyCallback as (
        actions: DatabaseActions
      ) => LocalVerifyCallbck
    case "JWT":
      return jwtVerifyCallback as (
        actions: DatabaseActions
      ) => JwtVerifyuCallback
    default:
      throw new Error(`unknown strategy ${strategy}`)
  }
}
export const getStrategy = (
  strategy: StrategyType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any = {},
  actions: DatabaseActions
): PassportStrategy => {
  const verifyCallback = getVerifyCallback(strategy)
  switch (strategy) {
    case "LOCAL": {
      return new LocalStrategy(options, verifyCallback(actions))
    }
    case "JWT": {
      return new JwtStrategy(options, verifyCallback(actions))
    }
    default:
      throw new Error(`unknown strategy ${strategy}`)
  }
}
