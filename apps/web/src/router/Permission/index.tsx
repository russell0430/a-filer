import { RouteObjectWithPermission } from "./types"
import { RouteObject } from "react-router-dom"
import permissionLoader from "./permissionLoader"
import RouteWithPermission from "./PermissionRoute"

const createBrowserRouterObjectWithPermission = (
  routes: RouteObjectWithPermission[]
): RouteObject[] => {
  return routes.map((route) => {
    if (route.auth) {
      return {
        ErrorBoundary: "div",
        ...route,
        loader: permissionLoader(route.redirect),
        element: (
          <RouteWithPermission redirect={route.redirect}>
            {route.element}
          </RouteWithPermission>
        ),
        ...(route.children
          ? {
              children: createBrowserRouterObjectWithPermission(route.children),
            }
          : {}),
      }
    } else
      return {
        ...route,
        ...(route.children
          ? {
              children: createBrowserRouterObjectWithPermission(route.children),
            }
          : {}),
      }
  }) as RouteObject[]
}

export default createBrowserRouterObjectWithPermission
