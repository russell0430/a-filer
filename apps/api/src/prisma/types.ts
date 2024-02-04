import prismaClient from "../libs/prisma"
import { Intersection, UnPromisify } from "shared-types"
import { $Enums, Profile } from "@prisma/client"
const medias = Object.keys($Enums.Media).filter(
  (media) => media !== "unknown"
) as PrismaMediaType[]
type Media = Exclude<keyof typeof $Enums.Media, "unknown">
type Role = $Enums.Role
type PrismaClientType = typeof prismaClient

type PrismaMediaType = Intersection<Media, keyof PrismaClientType>

const isMediaType = (media: string): media is Media => {
  return Object.keys($Enums.Media).includes(media) && media !== "unknown"
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
  Role,
  Profile,
  PrismaClientType,
  PrismaMediaType,
  MediaDataType,
  UserForAuthorization,
}
export { isMediaType, medias }
