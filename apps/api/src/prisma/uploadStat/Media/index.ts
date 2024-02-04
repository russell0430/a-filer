import { ActionResponse } from "shared-types"
import type { MediaDataType, PrismaMediaType } from "../../types"
import { medias } from "../../types"
import { createByMedia } from "./config"
export type MediaApi<T extends PrismaMediaType> = {
  create: (item: MediaDataType[T]) => ActionResponse<MediaDataType[T]>
  findById: (id: string) => ActionResponse<MediaDataType[T][]>
  findByFolderId: (id: string) => ActionResponse<MediaDataType[T][]>
}

export type MediaConfig = {
  [key in PrismaMediaType]: MediaApi<key>
}

const config = {} as MediaConfig

for (let i = 0; i < medias.length; i++) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(config as any)[medias[i]] = createByMedia(medias[i])
}

export default config
