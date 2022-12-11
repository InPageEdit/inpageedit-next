import type { InPageEdit } from '..'

export function useContext<T, O>(payload: (ctx: InPageEdit, options?: O) => T) {
  return payload
}
