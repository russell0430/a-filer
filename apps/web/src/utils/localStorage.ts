const localStorageHelper = <T extends string>(key: string) => {
  const get: () => T | null = () => localStorage.getItem(key) as T | null

  const set = (value: T) => localStorage.setItem(key, value)

  const remove = () => localStorage.removeItem(key)

  return { get, set, remove }
}

export default localStorageHelper
