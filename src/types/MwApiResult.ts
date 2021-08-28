export interface MwApiParseResult {
  parse: {
    title: string
    pageid: number
    langlinks: {
      lang: string
      url: string
      langname: string
      autonym: string
      title: string
    }[]
    categories: {
      sortkey: string
      category: string
      hidden: boolean
    }[]
    templates: {
      ns: number
      title: string
      exists: boolean
    }[]
    images: string[]
    sections: {
      toclevel: number
      level: `${number}`
      line: string
      number: `${number}`
      index: `${number}` | ''
      fromtitle: boolean
      byteoffset: number | null
      anchor: string
    }[]
    wikitext: string
  }
}

export interface MwApiQueryPagesResult {
  batchcomplete: boolean
  query: {
    pages: {
      pageid: number
      ns: number
      title: string
      revisions: {
        revid: number
        parentid: number
        minor?: boolean
        user: string
        timestamp: string
        comment: string
      }[]
      contentmodel: string
      pagelanguage: string
      pagelanguagehtmlcode: string
      pagelanguagedir: string
      touched: string
      lastrevid: number
      length: number
      protection: {
        type: string
        level: string
        expiry: string
      }[]
      restrictiontypes: string[]
    }[]
  }
}

export interface MwApiEditResult {
  edit: {
    result: string
    pageid: number
    title: string
    contentmodel: string
    oldrevid?: number
    newrevid: number
    newtimestamp: string
  }
}

export interface MwApiErrorResult {
  error: {
    code: string
    info: string
    docref: string
  }
}
