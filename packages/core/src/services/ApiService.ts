import { Context, Service } from 'cordis'
import { MediaWikiApi, MediaWikiForeignApi } from 'mediawiki-api-axios'

export class ApiService extends Service {
  static using = ['url']

  constructor(public ctx: Context, options: { isForeign?: boolean }) {
    super(ctx, 'api', true)
    const endpoint = ctx.url.getScript('api')
    /**
     * @dragon-fish 2023年3月5日
     * @FIXME 这里这种做法事实上是行不通的
     *        service 是一个 getter，set 的时候会报错
     *        不知道怎么修
     */
    ctx.api = !options.isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
  }
}
