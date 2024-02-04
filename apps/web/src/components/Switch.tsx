import React, { useState } from "react"
export type SwitchChangeEventHandler = (
  checked: boolean,
  event: React.MouseEvent<HTMLButtonElement>
) => void
export type SwitchClickEventHandler = SwitchChangeEventHandler

interface SwitchProps {
  checked: boolean
  disabled?: boolean
  loadingIcon?: React.ReactNode
  onChange?: SwitchChangeEventHandler
  onClick?: SwitchClickEventHandler
}
const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  onClick,
  disabled,
  loadingIcon,
}) => {
  const [innerChecked, setInnerChecked] = useState(false)
  function triggerChange(
    pendingChecked: boolean,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    let checked = innerChecked
    if (!disabled) {
      checked = pendingChecked
      setInnerChecked(checked)
      onChange?.(checked, event)
    }
    return checked
  }
  function onInternalClick(e: React.MouseEvent<HTMLButtonElement>) {
    const ret = triggerChange(!innerChecked, e)
    onClick?.(ret, e)
  }
  return (
    <button type="button" role="switch" disabled onClick={onInternalClick}>
      {loadingIcon}
    </button>
  )
}
export default Switch
