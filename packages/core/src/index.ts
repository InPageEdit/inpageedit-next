import { MediaWikiApi, MediaWikiForeignApi } from 'mediawiki-api-axios'
import { useWikiPage, WikiPage } from '../../wikipage/src'
import { SiteInfo } from './types/SiteInfo'
import { useGetScript, useGetUrl } from './utils/url'

export class InPageEdit {
  // WikiPage: typeof WikiPage
  api: MediaWikiApi
  endpoint: string
  WikiPage: typeof WikiPage

  static async newFromApiEndpoint(endpoint: string, isForeign = false) {
    const api = !isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
    const { data: siteinfo } = await api.get({
      action: 'query',
      meta: 'siteinfo',
      siprop: 'general|namespaces|namespacealiases|magicwords|extensiontags|functionhooks',
    })
    return new InPageEdit(siteinfo.query, isForeign)
  }

  constructor(readonly siteInfo: SiteInfo, isForeign = false) {
    this.endpoint = this.utils.getScript('api')
    this.api = !isForeign ? new MediaWikiApi(this.endpoint) : new MediaWikiForeignApi(this.endpoint)
    this.WikiPage = useWikiPage(this)
  }

  get utils() {
    return {
      getUrl: useGetUrl(this),
      getScript: useGetScript(this),
    }
  }
}

export class Service {
  protected ctx: InPageEdit
}

export function useContext<T, O>(payload: (ctx: InPageEdit, options?: O) => T) {
  return payload
}
