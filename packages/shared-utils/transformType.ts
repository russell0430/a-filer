import { config } from "../configs"
import { MediaType } from "@shared/types/Media"

// // get "" means it is folder
export const ext2MediaType = (ext: string): MediaType | undefined => {
  const mediaOrNull = Object.keys(config).find((key) => {
    const exts = config[key as keyof typeof config].exts
    return Array.isArray(exts) ? exts.includes(ext) : exts === ext
  }) as keyof typeof config
  if (!mediaOrNull) return
  return config[mediaOrNull].name
}

export const mediaType2Exts = (mediaType: MediaType): string[] | string => {
  return config[mediaType].exts
}
