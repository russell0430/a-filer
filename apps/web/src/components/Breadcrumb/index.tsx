// just follow antd@5
// https://github.com/ant-design/ant-design/blob/5.6.1/components/breadcrumb/Breadcrumb.tsx
import React, { Fragment } from "react"
import { IoHome } from "react-icons/io5"
import BreadcrumbSeparator from "./BreadcrumbSeparator"
import { useNavigate } from "react-router-dom"

export interface BreadcrumbSeparatorType {
  type: "separator"
  separator?: React.ReactNode
}
export interface BreadcrumbItemType {
  key: string
  href?: string
  path?: string
  title?: React.ReactNode
  onClick?: () => void
}
export type ItemType = Partial<BreadcrumbItemType & BreadcrumbSeparatorType>
interface BreadCrumbProps {
  items: ItemType[]
  separator?: React.ReactNode
  withHost?: boolean
}
const BreadCrumb: React.FC<BreadCrumbProps> = ({
  items: itemsFromProps,
  separator = "/",
  withHost = false,
}) => {

  const navigate=useNavigate()
  const items = withHost
    ? [
        {
          key: "defaultHost",
          title: (
            <div className="mx-1">
              <IoHome size={24} />
            </div>
          ),
          onClick:()=>navigate("/")
        } as ItemType,
        ...itemsFromProps,
      ]
    : itemsFromProps
  const paths: string[] = []

  const crumbs: React.ReactNode = items.map((item, index) => {
    const { onClick, separator: itemSeparator, type, path, title, key } = item

    // console.log(key, index)
    if (path !== undefined) {
      paths.push(path)
    }

    if (type === "separator") {
      return (
        <BreadcrumbSeparator key={`separator-${index}`}>
          {itemSeparator}
        </BreadcrumbSeparator>
      )
    }

    const isLastItem = index === items.length - 1

    let { href } = item
    if (paths.length && path !== undefined) {
      href = `${paths.join("/")}`
    }

    return (
      <Fragment key={item.key}>
        <li
          onClick={onClick}
          key={key}
          className="inline-block bg-white mx-1 hover:bg-gray-300 rounded-xl transition text-sm sm:text-md cursor-pointer"
        >
          {href !== undefined && href !== "" ? (
            <a href={href} className="py-1">
              {title}
            </a>
          ) : (
            <span onClick={onClick} className="mx-1 my-2">
              {title}
            </span>
          )}
        </li>
        {
          <BreadcrumbSeparator key={`${item.key}-separator`}>
            {!isLastItem ? separator : ""}
          </BreadcrumbSeparator>
        }
      </Fragment>
    )
  })

  return (
    <nav className="overflow-hidden">
      <ol className="h-8 flex items-center">{crumbs}</ol>
    </nav>
  )
}

export default BreadCrumb
