import { Context, Service } from 'cordis'

export class UrlService extends Service {
  constructor(public ctx: Context, public options?: any) {
    super(ctx, 'url', true)
  }

  getScript(name = 'index') {
    const { server, scriptpath } = this.ctx.siteInfo.general
    const url = new URL(server)
    url.pathname = `${scriptpath}/${name.endsWith('.php') ? name.substring(name.length - 4) : name}.php`
    return url.href
  }

  getPage(title: string, params?: Record<string, string>) {
    const { script, articlepath } = this.ctx.siteInfo.general
    return params
      ? `${script}?${new URLSearchParams({ ...params, title })}`
      : `${articlepath.replace('$1', encodeURI(title))}`
  }
}
