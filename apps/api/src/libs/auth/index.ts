import { databaseActions } from "./database"
import { getStrategy } from "./strategies"
import type { StrategyType } from "./types"
interface StrategyOptions {
  strategy: StrategyType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strategyOptions?: any
}
export const constructStrategy = ({
  strategy,
  strategyOptions,
}: StrategyOptions) => {
  const strategyInstance = getStrategy(
    strategy,
    strategyOptions,
    databaseActions
  )
  return strategyInstance
}
