import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { AuthContextObject } from "./context"
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
  setTokenToLocalStorage,
} from "@/utils/storage"
import {
  login as loginRequest,
  register as registerRequest,
  fetchMe as fetchMeRequest,
} from "@/request"
export type { LoginOptions, RegisterOptions } from "@/request/types"
import decodeJwt from "./decodeJwt"
const AuthContext = createContext<AuthContextObject>({} as AuthContextObject)

export const AuthContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // const location = useLocation()
  const [user, setUser] = useState<AuthContextObject["user"]>(null)
  const [userInfo, setUserInfo] = useState<AuthContextObject["userInfo"]>(null)

  // decode token in localstorage and change User
  const signInWithToken = useCallback(() => {
    const token = getTokenFromLocalStorage()
    console.log(token)
    if (token) {
      // means has login
      const userFromToken = decodeJwt(token)

      if (userFromToken) {
        setUser(userFromToken)
        console.log(userFromToken)
        // fetch userInfo here
      }
    }
  }, [])

  const login: AuthContextObject["login"] = useCallback(
    async (options, success, fail) => {
      const response = await loginRequest(options)
      if (response.status !== 200) {
        fail && fail(response)
        return
      }
      if (response.data.success) setTokenToLocalStorage(response.data.data)
      signInWithToken()
      success && success(response)
    },
    [signInWithToken]
  )

  const logout: AuthContextObject["logout"] = useCallback(async (success) => {
    removeTokenFromLocalStorage()
    setUser(null)
    success && success(1)
  }, [])

  const register: AuthContextObject["register"] = useCallback(
    async (options, success, fail) => {
      const response = await registerRequest(options)
      if (response.status !== 200) {
        fail && fail(response)
        return
      }
      if (response.data.success) setTokenToLocalStorage(response.data.data)
      success && success(response)
    },
    []
  )

  const fetchMe: AuthContextObject["fetchMe"] = useCallback(async () => {
    //
    const response = await fetchMeRequest()
    if (response.status === 200 && response.data.success) {
      setUserInfo(response.data.data)
    }
  }, [])

  // auto login
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/login") {
      // auto login
      signInWithToken()
    }
  }, [signInWithToken])

  const contextValue = useMemo(
    () => ({ user, userInfo, login, logout, register, fetchMe }),
    [user, userInfo, login, logout, register, fetchMe]
  )
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextObject => useContext(AuthContext)
