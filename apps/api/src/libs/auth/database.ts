import { DatabaseActions } from "./types"
import {
  findUserByEmailForAuthorization,
  findUserByUidForAuthorization,
  validateUser,
} from "../../prisma/User"
export const databaseActions: DatabaseActions = {
  findUserByEmail: findUserByEmailForAuthorization,
  findUserByUid: findUserByUidForAuthorization,
  validate: validateUser,
}
