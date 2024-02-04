import React, { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Button from "@/components/Button"
import { useNavigate } from "react-router-dom"
import Avatar from "@/components/avatars/Avatar"
import Drawer from "@/components/drawers/Drawer"
import { AiOutlineSetting } from "react-icons/ai"
import { Switch, Tab } from "@headlessui/react"

import clsx from "clsx"
import useFolderFormat, { folderFormat } from "@/hooks/useFolderFormat"
import { useConfig } from "@/contexts/ConfigContext"
interface HeaderProps {
  title?: string
}

const Header: React.FC<HeaderProps> = ({ title = "AFiler" }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { darkMode, toggleDarkMode, format, setFormat } = useConfig()
  const { userInfo, user, logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    logout()
  }, [logout])
  return (
    <>
      <header className="bg-white shadow-md h-full flex justify-between items-center px-8 dark:bg-green-300">
        <div className="px-4 sm:px-6 py-2 mr-auto">
          <span className="text-bold text-2xl font-semibold">{title}</span>
        </div>
        <div className="px-2">
          {user === null ? (
            <Button onClick={() => navigate("/login")}>Login</Button>
          ) : (
            <div className="py-auto w-full" onClick={() => setDrawerOpen(true)}>
              <Avatar user={userInfo} />
            </div>
          )}
        </div>
        <div
          className="px-2 hover:animate-[spin_1.5s_ease-in-out] hover:cursor-pointer"
          onClick={() => {
            setDrawerOpen(true)
          }}
        >
          <AiOutlineSetting size="26" />
        </div>
      </header>
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="p-3">
          <div className="flex justify-between">
            <span>dark mode</span>
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode}
              className={`${
                darkMode ? "bg-green-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  darkMode ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <span>folder format</span>
            <Tab.Group
              defaultIndex={folderFormat.indexOf(format)}
              onChange={(index: number) => {
                console.log(index)
                setFormat(folderFormat[index])
              }}
            >
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 ml-auto ">
                {folderFormat.map((format) => (
                  <Tab
                    key={format}
                    className={({ selected }) =>
                      clsx(
                        "w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5",
                        "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                        selected
                          ? "bg-white text-blue-700 shadow"
                          : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                      )
                    }
                  >
                    {format}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.List></Tab.List>
            </Tab.Group>
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Header
