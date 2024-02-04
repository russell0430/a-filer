import React from "react"
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
  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="h-16 w-full flex-shrink-0 flex-grow-0">{header}</div>
      <main className="mt-4 grow px-8 w-full overflow-y-auto">{main}</main>
      <div className="w-full h-20 bottom-0 flex-shrink-0 flex-grow-0">{footer}</div>
    </div>
  )
}

export default FolderLayout
