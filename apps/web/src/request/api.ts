import qs from "qs"
import { getTokenFromLocalStorage } from "../utils"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ""
type GetOptions = RequestInit & {
  params?: Record<string, unknown>
}

const getHeaders = (): HeadersInit => {
  const token = getTokenFromLocalStorage()
  return token
    ? {
        Authorization: token,
      }
    : {}
}
export const requests = {
  get: (url: string, options: GetOptions = {}): Promise<Response> => {
    let query = ""
    if (options.params) {
      query = qs.stringify(options.params, { addQueryPrefix: true })
    }
    console.log(`${BACKEND_URL}${url}${query}`)
    const headers = options && options.headers ? { ...options.headers } : {}
    return fetch(`${BACKEND_URL}${url}${query}`, {
      // credentials: "include",
      method: "get",
      headers: {
        ...headers,
        ...getHeaders(),
      },
      ...options,
    })
  },

  post: (
    url: string,
    options: RequestInit = { headers: {} }
  ): Promise<Response> => {
    const headers = options && options.headers ? { ...options.headers } : {}

    const formattedOptions: RequestInit = {
      ...options,
      method: "post",
      // credentials: "include",
      headers: {
        ...headers,
        ...getHeaders(),
        "Content-Type": "application/json",
      },
    }

    console.log(formattedOptions)
    return fetch(`${BACKEND_URL}${url}`, formattedOptions)
  },
}
