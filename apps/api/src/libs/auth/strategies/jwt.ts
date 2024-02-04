import { VerifyCallback as JwtVerifyCallback } from "passport-jwt"
import { VerifyCallback } from "./types"

export const verifyCallback: VerifyCallback<JwtVerifyCallback> = function ({
  findUserByUid,
}) {
  const jwtVerifyCallback: JwtVerifyCallback = (jwt_payload, done) => {
    findUserByUid(jwt_payload.sub)
      .then((response) => {
        console.log(response)
        if (response.success && response.data) {
          // find the user
          return done(null, response.data)
        } else {
          // no such user
          return done(null, false)
        }
      })
      .catch((err) => {
        // something went wrong
        return done(err, false)
      })
  }
  return jwtVerifyCallback
}
