import React, {
  forwardRef,
  ForwardedRef,
  ForwardRefRenderFunction,
  Fragment,
  useRef,
  useImperativeHandle,
} from "react"
import ScrollContainer from "../ScrollContainer"
import { ListContextProvider } from "./context"
import Item, { ListItemTypeProps } from "./Item"
import clsx from "clsx"
export interface ListProps<T> {
  as?: JSX.ElementType
  className?: string
  grid?: boolean
  active?: number | false
  rowKey: ((item: T) => React.Key) | keyof T
  renderItem: (item: {
    item: T
    index: number
    active: boolean
  }) => React.ReactNode
  dataSource: T[]
  loading?: false | React.ReactNode
}

export interface ListRef {
  scrollTo: (index: number) => void
  getHeight: () => number
  element: () => HTMLElement | null
}

function InneralList<T>(
  props: ListProps<T>,
  externalRef: ForwardedRef<ListRef>
): React.ReactNode {
  const {
    as: Wrapper = "div",
    className,
    dataSource,
    renderItem,
    rowKey,
    active,
    grid = false,
    loading = false,
  } = props
  const containerRef = useRef<HTMLElement>(null)

  const renderInnerItem = (item: T, index: number) => {
    if (!renderItem) return null
    let key
    if (typeof rowKey === "function") {
      key = rowKey(item)
    } else if (rowKey) {
      key = item[rowKey]
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      key = (item as any).key
    }
    if (!key) {
      key = `list-item-${index}`
    }
    return (
      <Fragment key={key}>
        {renderItem({
          item,
          index,
          active: typeof active === "number" ? active === index : false,
        })}
      </Fragment>
    )
  }

  useImperativeHandle(
    externalRef,
    () => ({
      scrollTo: (index: number) => {
        //
      },
      getHeight: () => {
        console.log(containerRef.current?.scrollHeight)
        return containerRef.current?.scrollHeight || 0
      },
      element: () => containerRef.current,
    }),
    []
  )

  let childrenContent: React.ReactNode = loading || (
    <div style={{ minHeight: 53 }}></div>
  )
  if (dataSource.length > 0) {
    const items = dataSource.map(renderInnerItem)
    childrenContent = (
      <ScrollContainer
        as={grid ? "div" : "ol"}
        ref={containerRef}
        className={
          grid
            ? "list-grid grid grid-cols-[repeat(auto-fill,minmax(8rem,_1fr))]"
            : "flex flex-col w-full"
        }
      >
        {items}
      </ScrollContainer>
    )
  }
  return (
    <ListContextProvider grid={grid}>
      <Wrapper className={clsx(className, `list-none`)}>
        {childrenContent}
      </Wrapper>
    </ListContextProvider>
  )
}
export type ListTypeProps<T = unknown> = ForwardRefRenderFunction<
  ListRef,
  ListProps<T>
> & {
  Item: ListItemTypeProps
}

const List = forwardRef(InneralList) as unknown as (<Value>(
  props: ListProps<Value> & React.RefAttributes<ListRef>
) => React.ReactElement) & { Item: ListItemTypeProps }
List.Item = Item
export default List
