export interface MwApiParse {
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
