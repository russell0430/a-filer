import { UserForAuthorization } from "../../prisma/types"
declare global {
  namespace Express {
    export interface User extends UserForAuthorization {}
    export interface Request {
      user?: User
    }
  }
}
export {}
