import { RequestHandler } from "express"

import config from "../prisma/uploadStat/Media"
import { Media } from "../prisma/types"

const mediaHandler: (media: Media) => RequestHandler<{ resourceId: string }> =
  (media) => async (req, res) => {
    const result = await config[media].findById(req.params.resourceId)
    return res.status(200).json(result).end()
  }

const mediaFolderHandler: (
  media: Media
) => RequestHandler<{ resourceId: string }> = (media) => async (req, res) => {
  console.log(media, req.params.resourceId)
  const result = await config[media].findByFolderId(req.params.resourceId)
  return res.status(200).json(result).end()
}

export { mediaHandler, mediaFolderHandler }
