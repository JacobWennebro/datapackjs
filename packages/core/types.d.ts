
type TargetSelectorOption = 'p' | 'r' | 'a' | 'e' | 's' | 'n'

export type TargetSelector = `@${TargetSelectorOption}` | (string & {})