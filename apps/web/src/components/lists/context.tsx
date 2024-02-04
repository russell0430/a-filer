import { ReactNode, createContext } from "react"

export interface ListContextObject {
  grid: boolean
}
export const ListContext = createContext({} as ListContextObject)

export const ListContextProvider: React.FC<{
  children?: ReactNode
  grid?: boolean
}> = (props) => {
  const { children, grid = false } = props
  return (
    <ListContext.Provider value={{ grid }}>{children}</ListContext.Provider>
  )
}
