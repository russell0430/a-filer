import React, { ElementType, Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import { usePopper } from "react-popper"
import clsx from "clsx"
interface PopoverTopProps {
  button: React.ReactNode
  panel: React.ReactNode
  className?: string
  popoverAs?: ElementType
  buttonAs?: ElementType
}
const PopoverTop: React.FC<PopoverTopProps> = ({
  button,
  panel,
  className,
  popoverAs = "div",
  buttonAs = "button",
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
  })
  return (
    <Popover as={popoverAs} className={clsx("relative", className)}>
      <Popover.Button ref={setReferenceElement} as={buttonAs}>
        {button}
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className="absolute z-10"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {panel}
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default PopoverTop
