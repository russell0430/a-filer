import localStorageHelper from "./localStorage"

const TOKEN_KEY = "AFILER_TOKEN_KEY"

const helper = localStorageHelper(TOKEN_KEY)

export const getTokenFromLocalStorage = helper.get
export const removeTokenFromLocalStorage = helper.remove
export const setTokenToLocalStorage = helper.set
