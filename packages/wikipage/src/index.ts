import { useContext, InPageEdit } from '../../core/src'
import type { PageInfo } from './types/PageInfo'

type ApiParams = Record<string, string | number | string[] | undefined | boolean>

class WikiPageFactory {
  constructor(public ctx: InPageEdit, public PAGE_INFO: PageInfo) {}

  async parse(params?: ApiParams) {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      page: this.PAGE_INFO.title,
      prop: 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings',
      ...params,
    })
    return parse
  }
  async preview(text: string, params?: ApiParams) {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      text,
      title: this.PAGE_INFO.title,
      pst: 1,
      preview: 1,
      disableeditsection: 1,
      disablelimitreport: 1,
      ...params,
    })
    return parse
  }
  async edit(text: string, payload?: Partial<{ starttimestamp: string }>) {
    return this.ctx.api.post({
      action: 'edit',
      starttimestamp: this.PAGE_INFO.touched,
      basetimestamp: this.PAGE_INFO.r,
      ...payload,
    })
  }
  async delete() {
    // ...
  }
}

export abstract class WikiPage extends WikiPageFactory {
  constructor(public PAGE_INFO: PageInfo) {
    super({} as any, PAGE_INFO)
  }
  static _createInstance: (payload: Record<string, any>) => Promise<WikiPage>
  static newFromTitle: (title: string, converttitles?: boolean) => Promise<WikiPage>
  static newFromPageId: (pageid: number, converttitles?: boolean) => Promise<WikiPage>
  static newFromRevision: (revid: number, converttitles?: boolean) => Promise<WikiPage>
}

export const useWikiPage = useContext((ctx) => {
  return class WikiPageWithContext extends WikiPageFactory implements WikiPage {
    constructor(public PAGE_INFO: PageInfo) {
      super(ctx, PAGE_INFO)
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
