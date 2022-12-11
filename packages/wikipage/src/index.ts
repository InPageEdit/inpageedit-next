import type { InPageEdit } from '../../core/src'
import type { PageInfo } from './types/PageInfo'
import type { MwApiParams } from 'mediawiki-api-axios'
import { useContext } from '../../core/src/utils/useContext'

type WatchlistType = 'preferences' | 'watch' | 'unwatch' | 'nochange'

class WikiPageFactory {
  constructor(public ctx: InPageEdit, public PAGEINFO: PageInfo) {}

  /**
   * Check whether the current user can perform certain operations
   */
  isAbleTo(action: 'edit' | 'move' | 'delete') {
    return this.PAGEINFO.actions[action]
  }
  async parse(params?: MwApiParams) {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      page: this.PAGEINFO.title,
      prop: 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings',
      ...params,
    })
    return parse
  }
  async preview(text: string, params?: MwApiParams) {
    const parse = await this.parse({
      action: 'parse',
      page: undefined,
      title: this.PAGEINFO.title,
      text,
      pst: 1,
      preview: 1,
      disableeditsection: 1,
      disablelimitreport: 1,
      ...params,
    })
    return parse
  }
  async edit(payload: { text: string; summary?: string; watchlist?: WatchlistType }, params?: MwApiParams) {
    const { text, summary = '', watchlist = 'preferences' } = payload
    return this.ctx.api.postWithEditToken({
      action: 'edit',
      title: this.PAGEINFO.title,
      starttimestamp: this.PAGEINFO.touched,
      basetimestamp: this.PAGEINFO.revisions[0].timestamp,
      text,
      summary,
      watchlist,
      ...params,
    })
  }
  async create(payload: { text: string; summary?: string; watchlist?: WatchlistType }, params?: MwApiParams) {
    return this.edit(payload, { createonly: 1, ...params })
  }
  async delete(reason?: string, params?: MwApiParams) {
    return this.ctx.api.postWithEditToken({
      action: 'delete',
      pageid: this.PAGEINFO.pageid,
      reason,
      ...params,
    })
  }
}

export abstract class WikiPage extends WikiPageFactory {
  constructor(public PAGEINFO: PageInfo) {
    super({} as any, PAGEINFO)
  }
  static _createInstance: (payload: Record<string, any>) => Promise<WikiPage>
  static newFromTitle: (title: string, converttitles?: boolean) => Promise<WikiPage>
  static newFromPageId: (pageid: number, converttitles?: boolean) => Promise<WikiPage>
  static newFromRevision: (revid: number, converttitles?: boolean) => Promise<WikiPage>
}

export const useWikiPage = useContext((ctx) => {
  return class WikiPageWithContext extends WikiPageFactory implements WikiPage {
    constructor(public PAGEINFO: PageInfo) {
      super(ctx, PAGEINFO)
    }
    static async _createInstance(payload: Record<string, any>) {
      const {
        data: {
          query: {
            pages: [pageInfo],
          },
        },
      } = await ctx.api.get({
        action: 'query',
        prop: 'info|templates|transcludedin|images|pageimages|revisions',
        inprop: 'protection|url|varianttitles',
        intestactions: 'edit|move|delete',
        tllimit: 'max',
        tilimit: 'max',
        imlimit: 'max',
        piprop: 'thumbnail|name|original',
        pithumbsize: '200',
        pilimit: 'max',
        rvprop: 'ids|timestamp|flags|comment|user|content',
        ...payload,
      })
      return new WikiPageFactory(ctx, pageInfo)
    }
    static async newFromTitle(title: string, converttitles = false) {
      return this._createInstance({ titles: title, converttitles })
    }
    static async newFromPageId(pageid: number) {
      return this._createInstance({ pageids: pageid })
    }
    static async newFromRevision(revid: number) {
      return this._createInstance({ revids: revid })
    }
  }
})
