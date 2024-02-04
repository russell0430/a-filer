import React from "react"
export interface ItemProps {
  children: React.ReactElement
  setRef: (Element: HTMLElement) => void
}
const Item: React.FC<ItemProps> = ({ children, setRef }) => {
  const refFunc = React.useCallback(
    (node: HTMLElement) => {
      setRef(node)
    },
    [setRef]
  )
  return React.cloneElement(children, {
    ref: refFunc,
  })
}
export default Item
