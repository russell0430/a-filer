import { BarProps } from "../Bar/types"
import { CircleProps } from "../Circle"
export interface BasicProgressProps {
  percent: number
  style?: React.CSSProperties
}
export interface ProgressBarProps extends BasicProgressProps, BarProps {}
export interface ProgressCircleProps extends BasicProgressProps, CircleProps {}
