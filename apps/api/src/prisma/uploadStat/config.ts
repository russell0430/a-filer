import { ActionResponse } from "shared-types"
import { createByMedia } from "./Media/config"
import { Media, MediaDataType, medias } from "../types"

export type MediaApi<T extends Media> = {
  create: (item: MediaDataType[T]) => ActionResponse<MediaDataType[T]>
  findById: (id: string) => ActionResponse<MediaDataType[T][]>
  findByFolderId: (id: string) => ActionResponse<MediaDataType[T][]>
}

export type MediaConfig = {
  [key in Media]: MediaApi<key>
}

const config = {} as MediaConfig

for (let i = 0; i < medias.length; i++) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(config as any)[medias[i]] = createByMedia(medias[i])
}

export { config }
