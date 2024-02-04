import type {
  LoginOptions,
  RegisterOptions,
  LoginRequest,
  RegisterRequest,
  FetchResponse,
} from "@/request/types"
// import { UserForAuthorization, Profile } from "@shared/types/User"
import { UserForAuthorization, Profile } from "api"
// import { UnPromisify } from "@shared/types/utils"
import { UnPromisify } from "shared-types"
// two options to act after login successfully
// 1. callback function
// 2. return value about whether success
// here i choose the first one

type CallbackFunction<T> = (response: T) => void
export interface AuthContextObject {
  user: UserForAuthorization | null
  userInfo: Profile | null
  login: (
    options: LoginOptions,
    successCallback?: CallbackFunction<UnPromisify<ReturnType<LoginRequest>>>,
    failCallback?: CallbackFunction<UnPromisify<ReturnType<LoginRequest>>>
  ) => Promise<void>
  logout: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    successCallback?: CallbackFunction<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    failCallback?: CallbackFunction<any>
  ) => Promise<void>
  register: (
    options: RegisterOptions,
    successCallback?: CallbackFunction<
      UnPromisify<ReturnType<RegisterRequest>>
    >,
    failCallback?: CallbackFunction<UnPromisify<ReturnType<RegisterRequest>>>
  ) => Promise<void>
  fetchMe: () => Promise<void>
}
