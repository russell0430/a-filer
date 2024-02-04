import type { Audio } from "../../previews/Audio/component"
export interface AudioPlayerProps {
  audio: Audio | null
  handleChangeAudio: (audio: Audio) => void
  volume: number
  handleChangeVolume: (volume: number) => void
  isAudioPlaying: boolean
  toggleIsAudioPlaying: () => void
  currentTime: number
  setCurrentTime: (currentTime: number) => void
  duration: number
  onDurationChange: (duration: number) => void
  onAudioChange?: (index: number, resolve: () => void) => void
  list?: Audio[]
}
