import { Media } from "../types/Media"

import config from "../config"
export const ext2MediaType = (ext: string) => {
  const mediaOrNull = Object.keys(config).find((key) => {
    const exts = config[key as keyof typeof config].ext
    return Array.isArray(exts) ? exts.includes(ext) : exts === ext
  }) as keyof typeof config
  if (!mediaOrNull) return
  return config[mediaOrNull].name
}

export const mediaType2Exts = (mediaType: Media): string[] | string => {
  return config[mediaType].ext
}
