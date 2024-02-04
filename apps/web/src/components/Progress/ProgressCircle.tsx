import React from "react"
import Circle from "../Circle"
import { ProgressCircleProps } from "./types"
const ProgressCircle: React.FC<ProgressCircleProps> = (props) => {
  console.log(props.percent)
  return (
    <Circle size={props.size} percent={props.percent}>
      {props.children}
    </Circle>
  )
}

export default ProgressCircle
