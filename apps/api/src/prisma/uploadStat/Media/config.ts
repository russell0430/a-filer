import { ActionResponse } from "shared-types"
import prisma from "../../../libs/prisma"
import { MediaDataType, PrismaMediaType } from "../../types"
import { MediaApi } from "."
const createByMedia = (media: PrismaMediaType): MediaApi<PrismaMediaType> => {
  type DataType = MediaDataType[PrismaMediaType]
  const create = async (mediaItem: DataType): ActionResponse<DataType> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (prisma[media].create as any)({ data: mediaItem })
      return response
    } catch (err) {
      const msg = `something went wrong when save audio ${mediaItem.name}`
      console.log(msg)
      return { success: false, err, msg }
    }
  }

  const findById = async (ids: string): ActionResponse<DataType[]> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await (prisma[media] as any).findMany({
        where: { fileId: { in: ids.split(",") } },
      })
      if (data) {
        return { success: true, data }
      } else {
        const msg = `could not find ${media} :${ids}`
        return { success: false, msg }
      }
    } catch (err) {
      const msg = `something went wrong when find ${media} ${ids}`
      return { success: false, msg, err }
    }
  }

  const findByFolderId = async (
    folderId: string
  ): ActionResponse<DataType[]> => {
    try {
      const files = await prisma.file.findMany({
        where: { folderId, type: media },
      })
      if (!files) {
        return {
          success: false,
          msg: `folder ${folderId} does not have ${media}`,
        }
      }

      const mediaResponse = await findById(
        files.map(({ fileId }) => fileId).join(",")
      )

      return mediaResponse
    } catch (err) {
      const msg = `something went wrong when find audios ${folderId}`
      return { success: false, msg, err }
    }
  }

  return { create, findById, findByFolderId }
}

export { createByMedia }
