import React, { Suspense } from "react"
import {
  Route,
  RouteProps,
  Await,
  useLoaderData,
  redirect,
  useNavigate,
} from "react-router-dom"
import { RouteWithPermissionProp } from "./types"
import Loading from "@/components/Loading"
import permissionLoader from "./permissionLoader"
import { FetchResponse } from "@/request/types"
const RouteWithPermission: React.FC<RouteWithPermissionProp> = (props) => {
  const { fallback = <Loading />, children, redirect: redirectPath } = props

  const data = useLoaderData() as { permission: boolean }

  const navigate = useNavigate()

  return (
    <Suspense fallback={fallback}>
      <Await resolve={data.permission} errorElement={<div>error</div>}>
        {(permission) => {
          console.log(permission.data.data.result)
          if (!permission.data.data.result) {
            navigate("/login")
            return <div>sorry , you are not authorized</div>
          }
          return children
        }}
      </Await>
    </Suspense>
  )
}

export default RouteWithPermission
