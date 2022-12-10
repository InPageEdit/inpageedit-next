import { useContext, InPageEdit } from '../../core/src'
import type { PageInfo } from './types/PageInfo'

export abstract class WikiPage {
  constructor(protected pageInfo: PageInfo) {}
  static _createInstance: (payload: Record<string, any>) => Promise<WikiPage>
  static newFromTitle: (title: string, converttitles?: boolean) => Promise<WikiPage>
  static newFromPageId: (pageid: number, converttitles?: boolean) => Promise<WikiPage>
  static newFromRevision: (revid: number, converttitles?: boolean) => Promise<WikiPage>
  parse(): Promise<any>
}

class WikiPageFactory extends WikiPage {
  constructor(protected ctx: InPageEdit, protected pageInfo: PageInfo) {
    super(pageInfo)
  }

  async parse() {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      page: this.pageInfo.title,
      prop: 'text|langlinks|categories|links|templates|images|externallinks|sections|revid|displaytitle|iwlinks|properties|parsewarnings',
    })
    return parse
  }
  async preview(text: string, params: Record<string, any>) {
    const {
      data: { parse },
    } = await this.ctx.api.post({
      action: 'parse',
      text,
      title: this.pageInfo.title,
      pst: 1,
      preview: 1,
      disableeditsection: 1,
      disablelimitreport: 1,
      ...params,
    })
    return parse
  }
  async edit(payload: { text: string }) {
    return this.ctx.api.post({
      action: 'edit',
      ...payload,
    })
  }
  async delete() {
    // ...
  }
}

export const useWikiPage = useContext((ctx) => {
  return class WikiPageWithContext extends WikiPageFactory implements WikiPage {
    constructor(protected pageInfo: PageInfo) {
      super(ctx, pageInfo)
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
        prop: 'info|templates|transcludedin|images|pageimages',
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
