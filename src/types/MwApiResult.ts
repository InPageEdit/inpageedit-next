export interface MwApiParseResult {
  parse: {
    title: string
    pageid: number
    langlinks: any[]
    categories: any[]
    templates: {
      ns: number
      exists?: ''
      '*': string
    }[]
    images: string[]
    sections: {
      toclevel: number
      level: `${number}`
      line: string
      number: `${number}`
      index: `${number}`
      fromtitle: string
      byteoffset: number
      anchor: string
    }[]
    text: {
      '*': string
    }
    wikitext: {
      '*': string
    }
  }
}

export interface MwApiQueryPagesResult {
  batchcomplete: string
  query: {
    pages: Record<
      `${number}`,
      {
        pageid: number
        ns: number
        title: string
        revisions: {
          revid: number
          parentid: number
          minor?: ''
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
        protection: any[]
        restrictiontypes: string[]
      }
    >
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
