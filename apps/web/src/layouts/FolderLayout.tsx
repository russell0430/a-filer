import React, { useEffect } from "react"
import { requests } from "@/request/api"
import axios from "axios"
interface FolderLayoutProps {
  header: React.ReactNode
  main: React.ReactNode
  footer: React.ReactNode
}
const FolderLayout: React.FC<FolderLayoutProps> = ({
  header,
  main,
  footer,
}) => {
  useEffect(() => {
    const f = async () => {
      const res = await axios.get(
        "https://a-filer-backend.vercel.app/api/folder/%2f"
      )
      console.log(res)
    }
    f()
  })
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="h-16 w-full flex-shrink-0 flex-grow-0">{header}</div>
      <main className="mt-4 grow px-8 w-full overflow-y-auto">{main}</main>
      <div className="w-full h-20 bottom-0 flex-shrink-0 flex-grow-0">
        {footer}
      </div>
    </div>
  )
}

export default FolderLayout
