// Core dependencies
import { Context } from 'cordis'
import { FishStore } from 'fish-store'

// Types
import type { SiteInfo } from './types/SiteInfo'
import type { MediaWikiApi } from 'wiki-saikou'

// Services and Plugins
import { ApiService } from './services/ApiService'
import { StorageService, type ObjectStorage } from './services/StorageService'
import { UrlService } from './services/UrlService'
import { ModalManagerService } from './services/ModalManager'
import { ToolboxService } from './services/Toolbox'
import { getSiteInfo } from './utils/getSiteInfo'

// Plugins
import { WikiPageService, type WikiPage } from '../../wikipage/src'
import { PluginQuickEdit } from './plugins/QuickEdit'

declare module 'cordis' {
  interface Context {
    app: InPageEdit
    api: MediaWikiApi
    siteInfo: SiteInfo
    url: UrlService
    storage: { ObjectStorage: typeof ObjectStorage }
    WikiPage: typeof WikiPage
  }
}

export class InPageEdit extends Context {
  readonly rootElement = document.createElement('div')

  constructor(readonly siteInfo: SiteInfo, isForeign?: boolean) {
    super()

    // Aliases
    this.app = this

    // Core services
    this.plugin(ApiService, { isForeign })
    this.plugin(UrlService)
    this.plugin(StorageService)
    this.plugin(ToolboxService)
    this.plugin(ModalManagerService)
    this.plugin(WikiPageService)

    // Plugins
    this.plugin(PluginQuickEdit)

    // Init elements
    this.rootElement.id = 'INPAGEEDIT_APP'
    document.body.appendChild(this.rootElement)
    this.start()

    this.on('ready', () => {
      console.info('InPageEdit', 'init ok', this)
    })
  }

  static async newFromApiEndpoint(endpoint: string, configs?: { isForeign: boolean; noCache: boolean }) {
    const { isForeign = false, noCache = false } = configs || {}
    const cache = new FishStore<SiteInfo>(`inpageedit/siteinfo/${endpoint}`, 3 * 24 * 60 * 60 * 1000)
    cache.value = (!noCache && cache.value) || (await getSiteInfo(endpoint, isForeign))
    return new InPageEdit(cache.value, isForeign)
  }
}
