import { UnPromisify } from "shared-types"
import { PrismaClientType } from "../types"

export type FileType = Exclude<
  UnPromisify<ReturnType<PrismaClientType["file"]["findUnique"]>>,
  null
>

export type FolderType = Exclude<
  UnPromisify<ReturnType<PrismaClientType["folder"]["findUnique"]>>,
  null
>
