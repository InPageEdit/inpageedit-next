import { Context } from 'cordis'

Context.service('storage')
export class StorageService {
  static using = ['api']
  constructor(public ctx: Context) {
    ctx.storage = {
      ObjectStorage,
    }
  }
}

export class ObjectStorage<T extends any> {
  readonly ns = 'InPageEdit'
  constructor(readonly name: string, readonly maxAge = 0) {}

  getItem(): T | null {
    if (this.isExpired) {
      return null
    }
    const raw = this.cacheData
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  }
  setItem(data: T) {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(data))
    localStorage.setItem(this.TIME_KEY, Date.now() + '')
    return this
  }

  get DATA_KEY() {
    return `${this.ns}:${this.name}/data`
  }
  get TIME_KEY() {
    return `${this.ns}:${this.name}/time`
  }
  get cacheData() {
    return localStorage.getItem(this.DATA_KEY)
  }
  get cacheTime() {
    const time = +(localStorage.getItem(this.TIME_KEY) || '0')
    return isNaN(time) ? 0 : time
  }
  get isExpired() {
    return Date.now() >= this.cacheTime + this.maxAge
  }
}

export class UserStorage<T extends any> {
  readonly ns = 'InPageEdit'
  constructor(readonly name: string, readonly maxAge = 0) {}

  getItem(): T | null {
    if (this.isExpired) {
      return null
    }
    const raw = this.cacheData
    if (!raw) return null
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  }
  setItem(data: T) {
    localStorage.setItem(this.DATA_KEY, JSON.stringify(data))
    localStorage.setItem(this.TIME_KEY, Date.now() + '')
    return this
  }

  get DATA_KEY() {
    return `${this.ns}:${this.name}/data`
  }
  get TIME_KEY() {
    return `${this.ns}:${this.name}/time`
  }
  get cacheData() {
    return localStorage.getItem(this.DATA_KEY)
  }
  get cacheTime() {
    const time = +(localStorage.getItem(this.TIME_KEY) || '0')
    return isNaN(time) ? 0 : time
  }
  get isExpired() {
    return Date.now() >= this.cacheTime + this.maxAge
  }
}
