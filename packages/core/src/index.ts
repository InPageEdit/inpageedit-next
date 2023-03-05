// Core dependencies
import { Context } from 'cordis'

// Types
import type { SiteInfo } from './types/SiteInfo'
import type { MediaWikiApi } from 'mediawiki-api-axios'

// Services and Plugins
import { WikiPage, WikiPageService } from '../../wikipage/src'
import { ApiService } from './services/ApiService'
import { UrlService } from './services/UrlService'
import { getSiteInfo } from './utils/getSiteInfo'

declare module 'cordis' {
  interface Context {
    app: InPageEdit
    api: MediaWikiApi
    siteInfo: SiteInfo
    url: UrlService
    WikiPage: typeof WikiPage
  }
}

export class InPageEdit extends Context {
  constructor(readonly siteInfo: SiteInfo, isForeign?: boolean) {
    super()

    // Aliases
    this.app = this

    // Core services
    this.plugin(ApiService, { isForeign })
    this.plugin(UrlService)
    this.plugin(WikiPageService)

    console.info('InPageEdit', 'init ok', this)
  }

  static async newFromApiEndpoint(endpoint: string, isForeign = false) {
    const siteinfo = await getSiteInfo(endpoint, isForeign)
    return new InPageEdit(siteinfo, isForeign)
  }
}
