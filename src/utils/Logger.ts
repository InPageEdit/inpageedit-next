/* eslint-disable @typescript-eslint/no-explicit-any */
class Logger {
  _prefix: string
  namespace: string
  log: (...msg: any) => void

  constructor(namespace: string) {
    this.namespace = namespace
    this._prefix = '[InPageEdit]'

    // Alias
    this.log = this.info
  }

  info(...msg: any[]): void {
    console.info(this._prefix, '[I]', this.namespace, ...msg)
  }

  warn(...msg: any[]): void {
    console.warn(this._prefix, '[W]', this.namespace, ...msg)
  }

  error(...msg: any[]): void {
    console.error(this._prefix, '[E]', this.namespace, ...msg)
  }
}

export { Logger }
