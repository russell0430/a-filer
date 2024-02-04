import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import router from "./router"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ConfigContextProvider } from "./contexts/ConfigContext"
import "./index.css"
import ToastContext from "./contexts/ToastContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConfigContextProvider>
        <RouterProvider router={router} />
      </ConfigContextProvider>
      <ToastContext />
    </AuthContextProvider>
  </React.StrictMode>
)
