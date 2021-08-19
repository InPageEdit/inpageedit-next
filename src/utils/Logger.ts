/* eslint-disable @typescript-eslint/no-explicit-any */
class Logger {
  name: string
  prefix: string
  log: (...msg: any) => void

  constructor(name: string) {
    this.name = name
    this.prefix = '[InPageEdit]'

    // Alias
    this.log = this.info
  }

  info(...msg: any[]): void {
    console.info(this.prefix, '[I]', this.name, ...msg)
  }

  warn(...msg: any[]): void {
    console.warn(this.prefix, '[W]', this.name, ...msg)
  }

  error(...msg: any[]): void {
    console.error(this.prefix, '[E]', this.name, ...msg)
  }
}

export { Logger }
