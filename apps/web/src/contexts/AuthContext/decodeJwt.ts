import { UserForAuthorization } from "api"
export default (token: string) => {
  try {
    const [headerBase64, payloadBase64, signatureBase64] = token.split(".")
    const payloadJson = atob(payloadBase64)
    return JSON.parse(payloadJson) as UserForAuthorization
  } catch (err) {
    console.log(err)
    return null
  }
}
