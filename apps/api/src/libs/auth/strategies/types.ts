import { DatabaseActions } from "../types.ts"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DefaultStrategy = (...args: any[]) => void
export type VerifyCallback<
  CustomVerifyCallback extends DefaultStrategy = DefaultStrategy,
  Actions extends DatabaseActions = DatabaseActions,
> = (actions: Actions) => CustomVerifyCallback
