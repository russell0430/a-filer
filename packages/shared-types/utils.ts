export type Intersection<T, U> = T extends U ? T : never
export type Promisify<T> = Promise<T>
export type PromisifyOrOrigin<T> = T | Promise<T>
export type UnPromisify<T> = T extends Promise<infer R> ? R : T

export type TrueOrFalse<T extends boolean, P = true, N = false> = T extends true
  ? P
  : N

export type ModifyArgs<T, ModifiedArgs extends unknown[]> = T extends (
  ...args: unknown[]
) => infer R
  ? (...modifiedArgs: ModifiedArgs) => R
  : never

export type PickOptional<T, K extends keyof T> = {
  [Key in keyof T]: Key extends K ? T[Key] | undefined : T[Key]
}
