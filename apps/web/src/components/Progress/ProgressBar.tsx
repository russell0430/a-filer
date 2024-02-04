import React from "react"
import { ProgressBarProps } from "./types"
import Bar from "../Bar"

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
      <Bar {...props} dragable={false} className=""></Bar>
  )
}

export default ProgressBar
