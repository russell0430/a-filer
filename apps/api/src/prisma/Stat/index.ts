import prisma from "../../libs/prisma"
import {
  ModifyArgs,
  TrueOrFalse,
  UnPromisify,
  ActionResponse,
} from "shared-types"
import { PrismaClientType, MediaDataType, PrismaMediaType } from "../types"
import { FileType, FolderType } from "./types"

type CreateFolderInput = Parameters<
  PrismaClientType["folder"]["create"]
>[0]["data"]

type CreateFileInput = Omit<
  Parameters<PrismaClientType["file"]["create"]>[0]["data"],
  "folderId"
>
const createFolder = async (
  parentFolderPathname: string,
  { name, pathname, label, permission }: Omit<CreateFolderInput, "parentId">
): ActionResponse => {
  let targetFolderId = ""
  if (pathname === "/") {
    targetFolderId = "$root$"
  } else {
    const response = await findFolder(parentFolderPathname, false)
    if (!response.success) {
      console.log(response.msg)
      return response
    }
    targetFolderId = response.data.folderId
  }
  try {
    const data = await prisma.folder.create({
      data: {
        parentId: targetFolderId,
        name,
        pathname,
        label,
        permission,
      },
    })

    return { success: true, data }
  } catch (err) {
    console.log("create folder error", err)
    return {
      success: false,
      msg: `can not create folder ${pathname}`,
    }
  }
}

const createFile = async (
  folderPathname: string,
  { pathname, name, fileId, type, permission }: CreateFileInput
): ActionResponse => {
  const response = await findFolder(folderPathname, false)
  if (!response.success) {
    return response
  }
  const targetFolder = response.data

  try {
    const data = await prisma.file.create({
      data: {
        folderId: targetFolder.folderId,
        folder: { connect: { folderId: targetFolder.folderId } },
        pathname,
        name,
        type: type,
        fileId,
        permission,
      },
    })
    return { success: true, data }
  } catch (err) {
    console.log("create file error", err)
    return { success: false, msg: `cannot create file ${pathname}`, err }
  }
}

const findFolder = async <T extends boolean>(
  pathname: string,
  includes: T
): ActionResponse<Folder<T>> => {
  console.log(pathname)
  const data = await prisma.folder.findUnique<{
    where: {
      pathname: string
    }
    include: {
      files: TrueOrFalse<T>
    }
  }>({
    where: {
      pathname,
    },
    include: {
      files: includes as TrueOrFalse<T>,
    },
  })

  if (data === null) {
    return { success: false, msg: `no such pathname ${pathname}` }
  }
  return { success: true, data: data as Folder<T> }
}

const findStatInFolder = async (
  folderId: string
): ActionResponse<
  FolderType & { subFolders: FolderType[]; files?: FileType[] }
> => {
  const folder = await prisma.folder.findUnique({
    where: {
      folderId,
    },
    include: {
      files: true,
    },
  })
  const subFolders = await prisma.folder.findMany({
    where: {
      parentId: folderId,
    },
  })
  if (!folder) {
    return { success: false, msg: `no such folderId ${folderId}` }
  }
  return {
    success: true,
    data: { ...folder, subFolders },
  }
}

const findItemByFolderId = async <T extends PrismaMediaType>(
  folderId: string,
  type: T
): ActionResponse<{
  files: MediaDataType[T][] | null
}> => {
  const files = await prisma.file.findMany({
    where: { folderId, type },
  })

  const findManyFunc = prisma[type].findMany as unknown as ModifyArgs<
    typeof findManyFunc,
    [{ where: { fileId: { in: string[] } } }]
  >
  const data = (await findManyFunc({
    where: { fileId: { in: files.map(({ fileId }) => fileId) } },
  })) as MediaDataType[T][]
  return { success: true, data: { files: data } }
}

type Folder<T extends boolean> = Exclude<
  UnPromisify<
    TrueOrFalse<
      T,
      ReturnType<
        typeof prisma.folder.findUnique<{
          where: {
            pathname: string
          }
          include: {
            files: true
          }
        }>
      >,
      ReturnType<
        typeof prisma.folder.findUnique<{
          where: {
            pathname: string
          }
          include: {
            files: false
          }
        }>
      >
    >
  >,
  null
>

export {
  createFolder,
  createFile,
  findFolder,
  findStatInFolder,
  findItemByFolderId,
}
