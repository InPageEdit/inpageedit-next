import { Context } from 'cordis'
import { MediaWikiApi, MediaWikiForeignApi } from 'wiki-saikou'

declare module 'cordis' {
  interface Context {
    api: MediaWikiApi
  }
}

export type Config = { isForeign?: boolean }

export class ApiService {
  static inject = ['url']

  constructor(
    public ctx: Context,
    options: Config
  ) {
    const endpoint = ctx.url.getScript('api')
    ctx.root.provide('api')
    ctx.root.api = !options.isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
    console.info('ApiService', 'installed', ctx.api)
  }
}
