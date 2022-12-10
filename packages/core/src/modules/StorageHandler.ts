export class LocalStorageHandler {
  constructor(readonly name: string, readonly cacheDuration = 24 * 60 * 60 * 1000) {}
}

export class UserjsStorageHandler {}
