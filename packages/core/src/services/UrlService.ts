import { Context, Service } from 'cordis'

export class UrlService extends Service {
  constructor(public ctx: Context, public options?: any) {
    super(ctx, 'url', true)
  }

  getScript(name = 'index') {
    const g = this.ctx.siteInfo.general
    const url = new URL(g.server)
    url.pathname = `${g.scriptpath}/${name.endsWith('.php') ? name.substring(name.length - 4) : name}.php`
    return url.href
  }

  getPage(title: string, params?: Record<string, string>) {
    const g = this.ctx.siteInfo.general
    return params
      ? `${g.script}?${new URLSearchParams({ ...params, title })}`
      : `${g.articlepath.replace('$1', encodeURI(title))}`
  }
}
