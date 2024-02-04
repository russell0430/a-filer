import { PrismaMediaType, PrismaClientType, Role } from "../../types/Media"

export type CreateInput<T extends PrismaMediaType> = Parameters<
  PrismaClientType[T]["create"]
>[0]["data"]
export type CreateFunction = (input: {
  data: CreateInput<PrismaMediaType>
}) => ReturnType<PrismaClientType[PrismaMediaType]["create"]>

type MediaConfig<T extends PrismaMediaType> = {
  name: T
  create: (params: { pathname: string; label: string }) => CreateInput<T>
  ext: string[] | string
}

export type MediaOption = {
  [key in Exclude<PrismaMediaType, "folder">]: MediaConfig<key>
}
export interface UploadFolderOption {
  folderPath: string
  option: MediaOption
  ignore?: string
  permissionUtil?: (
    pathname: string
  ) => { private: boolean; authorizedRoles: Role[] } | null
}

// type RRR =
//   | (Prisma.Without<Prisma.AudioCreateInput, Prisma.AudioUncheckedCreateInput> &
//       Prisma.AudioUncheckedCreateInput)
//   | (Prisma.Without<Prisma.AudioUncheckedCreateInput, Prisma.AudioCreateInput> &
//       Prisma.AudioCreateInput)
