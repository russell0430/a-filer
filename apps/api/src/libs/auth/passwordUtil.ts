import * as crypto from "crypto"
export function genPasword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex")
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex")
  return { salt, hash: genHash }
}
export function validatePassword(password: string, hash: string, salt: string) {
  const hashVertify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex")
  return hash === hashVertify
}
