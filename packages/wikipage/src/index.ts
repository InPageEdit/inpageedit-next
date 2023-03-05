import type { PageInfo } from './types/PageInfo'
import type { MwApiParams } from 'mediawiki-api-axios'
import { Context } from 'cordis'

type WatchlistType = 'preferences' | 'watch' | 'unwatch' | 'nochange'

class WikiPageFactory {
  #currentRevid?: number

  constructor(public ctx: Context, public pageInfo: PageInfo) {
    this.#currentRevid = pageInfo?.revisions?.[0].revid
  }

  // Utils
  async getPageInfo(payload: Record<string, any>) {
    const {
      data: {
        query: {
          pages: [pageInfo],
        },
      },
    } = await this.ctx.api.get({
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
    return pageInfo
  }
  checkPermission(action: 'edit' | 'move' | 'delete') {
    return this.pageInfo.actions[action]
  }

  // Page actions
  async parse(params?: MwApiParams) {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      page: this.pageInfo.title,
      prop: 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings',
      ...params,
    })
    return parse
  }
  async preview(text: string, params?: MwApiParams) {
    const parse = await this.parse({
      action: 'parse',
      page: undefined,
      title: this.pageInfo.title,
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
      title: this.pageInfo.title,
      starttimestamp: this.pageInfo.touched,
      basetimestamp: this.pageInfo?.revisions?.[0].timestamp,
      text,
      summary,
      watchlist,
      ...params,
    })
  }
  async createOnly(payload: { text: string; summary?: string; watchlist?: WatchlistType }, params?: MwApiParams) {
    return this.edit(payload, { createonly: 1, ...params })
  }
  async delete(reason?: string, params?: MwApiParams) {
    return this.ctx.api.postWithEditToken({
      action: 'delete',
      pageid: this.pageInfo.pageid,
      reason,
      ...params,
    })
  }
}

export class WikiPage extends WikiPageFactory {
  constructor(public pageInfo: PageInfo) {
    super({} as any, pageInfo)
  }
  static createInstance: (payload: Record<string, any>) => Promise<WikiPage>
  static newFromTitle: (title: string, converttitles?: boolean) => Promise<WikiPage>
  static newFromPageId: (pageid: number, converttitles?: boolean) => Promise<WikiPage>
  static newFromRevision: (revid: number, converttitles?: boolean) => Promise<WikiPage>
}

Context.service('WikiPage')
export class WikiPageService {
  constructor(public ctx: Context, public options?: any) {
    ctx.WikiPage = class extends WikiPageFactory implements WikiPage {
      constructor(public pageInfo: PageInfo) {
        super(ctx, pageInfo)
      }
      static async createInstance(payload: Record<string, any>) {
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
        return this.createInstance({ titles: title, converttitles })
      }
      static async newFromPageId(pageid: number) {
        return this.createInstance({ pageids: pageid })
      }
      static async newFromRevision(revid: number) {
        return this.createInstance({ revids: revid })
      }
    }
  }
}
