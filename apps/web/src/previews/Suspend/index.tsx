import React, { startTransition, useEffect, useRef, useState } from "react"
import { BasicPreview, Preview } from "../types"
import { useFolder } from "@/contexts/FolderContext"

interface DataContextConfig<T = any> {
  data: T | null
  isLoading: boolean
  error?: string
}
const DataContext = React.createContext({ data: null } as DataContextConfig)

function LoadingWrapper<T = unknown>(props: { config: Preview<T> }) {
  const { config } = props
  const {
    pathname,
    currentFolderId,
    current,
    fileList,
    type,
    isForbidden: isFolderForbidden,
  } = useFolder()

  const [isLoading, setIsLoading] = useState(false)
  const [isForbidden, setIsForbidden] = useState(false)
  const dataPathnameRef = useRef("")
  const [data, setData] = useState<T | null>(null)
  const dataLoadedRef = useRef(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      if (config.custom || !currentFolderId) {
        return
      }
      if (dataPathnameRef.current === `${pathname}/${type}`) {
        return
      }
      try {
        setIsLoading(true)
        const response = await config.request({
          fileId: fileList.find(({ name }) => name === current)?.fileId || "-1",
          folderId: currentFolderId,
          pathname,
        })

        if (response.status === 200 && response.data.success) {
          dataPathnameRef.current = `${pathname}/${type}`
          dataLoadedRef.current = true
          setData(response.data.data)
        } else if (response.status === 401 || response.status === 403) {
          setIsForbidden(true)
          console.log("wrong in request")
        }
      } catch (err: unknown) {
        //
        setError(err as string)
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [pathname, config, data, currentFolderId, current, fileList, type])

  // console.log(isForbidden, data)
  return (
    <DataContext.Provider
      value={{ isLoading, error, data }}
      children={
        <Wrapper
          custom={config.custom}
          key={pathname}
          isLoading={isLoading}
          Loading={<div>loading?</div>}
          isForbidden={isForbidden || isFolderForbidden}
          Forbid={<div>Forbid??</div>}
          component={<config.component />}
          force={dataLoadedRef.current}
        />
      }
    />
  )
}

const Wrapper: React.FC<{
  custom: boolean
  isLoading: boolean
  Loading: React.ReactNode
  component: React.ReactNode
  isForbidden: boolean
  Forbid: React.ReactNode
  force?: boolean
}> = ({
  isLoading,
  component,
  Loading,
  custom,
  isForbidden,
  Forbid,
  force = false,
}) => {
  const ref = useRef(true)

  useEffect(() => {
    if (isLoading) {
      ref.current = false
    }
  }, [isLoading])
  if (custom || force) return component
  if (isForbidden) return Forbid
  return ref.current || isLoading ? Loading : component
}
export default LoadingWrapper

export function useData<T = unknown>(): DataContextConfig<T> {
  return React.useContext<DataContextConfig<T>>(DataContext)
}
