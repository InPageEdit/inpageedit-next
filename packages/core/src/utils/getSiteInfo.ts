import { MediaWikiApi, MediaWikiForeignApi } from 'mediawiki-api-axios'
import { SiteInfo } from '../types/SiteInfo'

export async function getSiteInfo(endpoint: string, isForeign = false): Promise<SiteInfo> {
  const api = !isForeign ? new MediaWikiApi(endpoint) : new MediaWikiForeignApi(endpoint)
  const { data: siteinfo } = await api.get({
    action: 'query',
    meta: 'siteinfo',
    siprop: 'general|namespaces|namespacealiases|magicwords|extensiontags|functionhooks',
  })
  return siteinfo.query
}
