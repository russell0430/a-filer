import { RouteObject, RouteProps, RouterProps } from "react-router-dom"

export type RouteObjectWithPermission = Omit<RouteObject, "children"> &
  (
    | {
        auth?: false
      }
    | { auth: true; redirect: string }
  ) & {
    children?: RouteObjectWithPermission[]
  }

export interface RouteWithPermissionProp {
  redirect: string
  fallback?: React.ReactNode
  children?: React.ReactNode
}

// export type RouteWithPermissionProp = RouterProps & {
//   auth: boolean
//   redirect: string
// }

// export const isRouteWithPermissionProps = (
//   routeProps: RouteProps | RouteWithPermissionProp
// ): routeProps is RouteWithPermissionProp => {
//   return (routeProps as RouteWithPermissionProp).auth === true
// }
