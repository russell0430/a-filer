export interface BarProps {
  className?: string
  direction?: "horizontal" | "vertical"
  reverse?: boolean
  dragable?: boolean
  onChange?: (percent: number) => void
  percent: number

  style?: React.CSSProperties

  // the width of the bar width
  barWidth: number | string
  // background color of bar
  bgColor?: string
  // the color of bar
  barColor?: string
  //
  btnIcon?: React.ReactNode
}

export type SyntheticEvent =
  | React.MouseEvent
  | React.TouchEvent
  | MouseEvent
  | TouchEvent
