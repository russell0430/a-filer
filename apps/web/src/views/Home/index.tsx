import React, { useState } from "react"
import Header from "./Header"
import Body from "./Body"
import Footer from "./Footer"
import Drawer from "@/components/drawers/Drawer"
import Layout from "@/layouts/FolderLayout"
import { FolderContextProvider } from "@/contexts/FolderContext"
import { Outlet } from "react-router-dom"

const Home = () => {
  return (
    <Layout
      header={<Header />}
      main={
        <FolderContextProvider>
          <Outlet />
        </FolderContextProvider>
      }
      footer={<Footer />}
    />
  )
}

export default Home
