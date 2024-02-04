type Video = {
  url: string
  name: string
  creator?: string
  // initial volume between 0 and 1. default 0.2
  initialVolume?: number
}
export interface VideoPlayerProps {
  listOpen?: boolean
  handleWithList?: (val?: boolean) => void
  onVideoEnd?: () => void
  video: Video | null
  // default 640px
  width?: string | number
  // default 320px
  height?: string | number
}
