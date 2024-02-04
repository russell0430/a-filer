import { Promisify } from "./utils"

export type ActionResponse<Data = unknown> = Promisify<
  { success: true; data: Data } | { success: false; msg: string; err?: unknown }
>
export * from "./utils"
