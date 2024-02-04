import React from "react"

const BreadcrumbSeparator: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  return (
    <li className="inline" aria-hidden>
      {children === "" ? children : children || "/"}
    </li>
  )
}

export default BreadcrumbSeparator
