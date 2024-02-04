import { VerifyFunction as LocalVerifyCallback } from "passport-local"
import { VerifyCallback } from "./types"

export const verifyCallback: VerifyCallback<LocalVerifyCallback> = function ({
  findUserByEmail,
  validate,
}) {
  const localVerifyCallback: LocalVerifyCallback = (
    username,
    password,
    done
  ) => {
    findUserByEmail(username)
      .then(async (response) => {
        console.log(response)
        if (response.success) {
          const user = response.data
          const valid = await validate(user.username, password)
          if (valid.success && valid.data) {
            return done(null, user)
          }
        }
        return done(null, false, { message: "user or password went wrong" })
      })
      .catch((error: Error) => {
        return done(error)
      })
  }
  return localVerifyCallback
}
