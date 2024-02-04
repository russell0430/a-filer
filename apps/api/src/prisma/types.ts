import prismaClient from "../libs/prisma"
import { Intersection, UnPromisify } from "shared-types"
import { Profile } from "../generated"

const const1 = {
  audio: "audio",
  video: "video",
  markdown: "markdown",
  image: "image",
  unknown: "unknown",
}
const medias = Object.keys(const1).filter(
  (media) => media !== "unknown"
) as PrismaMediaType[]
type Media = Exclude<keyof typeof const1, "unknown">
type PrismaClientType = typeof prismaClient

type PrismaMediaType = Intersection<Media, keyof PrismaClientType>

const isMediaType = (media: string): media is Media => {
  return Object.keys(const1).includes(media) && media !== "unknown"
}

type MediaType<T extends PrismaMediaType> = PrismaClientType[T]
type MediaDataType = {
  [key in PrismaMediaType]: Exclude<
    UnPromisify<ReturnType<MediaType<key>["findUnique"]>>,
    null
  >
}

type UserForAuthorization = Pick<Profile, "uid" | "username" | "role">

export type {
  Media,
  Profile,
  PrismaClientType,
  PrismaMediaType,
  MediaDataType,
  UserForAuthorization,
}
export { isMediaType, medias }
