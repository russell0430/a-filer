// // all async actions
import { ActionResponse } from "shared-types"
import { UserForAuthorization } from "../../prisma/types"

export type findUserByEmailForAuthorization = (
  email: string
) => ActionResponse<UserForAuthorization>
export type findUserByUidForAuthorization = (
  uid: string
) => ActionResponse<UserForAuthorization>

export type Validate = (
  username: string,
  password: string
) => ActionResponse<boolean>

export interface DatabaseActions {
  findUserByEmail: findUserByEmailForAuthorization
  findUserByUid: findUserByUidForAuthorization
  validate: Validate
}

export type StrategyType = "LOCAL" | "JWT"
