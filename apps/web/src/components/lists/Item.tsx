import React, {
  ForwardRefExoticComponent,
  HTMLAttributes,
  forwardRef,
  useContext,
  useImperativeHandle,
} from "react"
import { ListContext } from "./context"
import { link } from "fs"
import clsx from "clsx"
export interface ListItemProps {
  className?: string
  children?: React.ReactNode
  actions?: React.ReactNode[]
  style?: React.CSSProperties
  border?: boolean
}

export type ListItemTypeProps = ForwardRefExoticComponent<
  ListItemProps & React.RefAttributes<HTMLElement>
>
const InternalItem: React.ForwardRefRenderFunction<
  HTMLElement,
  ListItemProps
> = (props, externalRef) => {
  const { className, children, actions, style, border = true, ...rest } = props
  const { grid } = useContext(ListContext)

  const actionsContent = actions && actions.length > 0 && (
    <ul className="item-action">
      {actions.map((action: React.ReactNode, index: number) => (
        <li key={`item-action-${index}`}>{action}</li>
      ))}
    </ul>
  )
  const Element = (grid ? "div" : "li") as JSX.ElementType
  const itemChildren = (
    <Element
      {...(grid ? { ref: externalRef } : {})}
      className={clsx(
        className,
        "cursor-pointer",
        border ? "ring-inset rounded-md hover:ring-2" : ""
      )}
    >
      {[children, actionsContent]}
    </Element>
  )

  return grid ? (
    <div className="item-grid-item">{itemChildren}</div>
  ) : (
    itemChildren
  )
}

export default forwardRef(InternalItem) as ListItemTypeProps
