import { Context } from 'cordis'
import { MediaWikiApi, MediaWikiForeignApi } from 'mediawiki-api-axios'

Context.service('api')
export class ApiService {
  static using = ['url']

  constructor(public ctx: Context, options: { isForeign?: boolean }) {
    const endpoint = ctx.url.getScript('api')
    ctx.api = !options.isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
    console.info('ApiService', 'installed', ctx.api)
  }
}
