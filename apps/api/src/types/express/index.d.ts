import { UserForAuthorization } from "../../prisma/types"
declare global {
  namespace Express {
    interface User extends UserForAuthorization {}
    type requestResource = string | undefined
  }
}
export {}
