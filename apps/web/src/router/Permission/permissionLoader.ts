import { redirect, LoaderFunction, defer } from "react-router-dom"
import { fetchPermission } from "@/request"

// get user info from jwt
const permissionLoader =
  (redirectPath: string): LoaderFunction =>
  ({ request, params }) => {
    console.log(request.url, "permission")
    const response = fetchPermission({ resourceId: request.url })
    return defer({
      permission: response,
    })
    // console.log(response)
    // if (!response.data.result) {
    //   //
    //   return redirect(redirectPath)
    // }
    // console.log("access")
    // return null
  }
export default permissionLoader
