import { Context } from 'cordis'
import { MediaWikiApi, MediaWikiForeignApi } from 'wiki-saikou'

export type Config = { isForeign?: boolean }

Context.service('api')
export class ApiService {
  static using = ['url']

  constructor(public ctx: Context, options: Config) {
    const endpoint = ctx.url.getScript('api')
    ctx.api = !options.isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
    console.info('ApiService', 'installed', ctx.api)
  }
}
