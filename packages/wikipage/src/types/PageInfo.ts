export interface PageInfo {
  pageid: number
  ns: number
  title: string
  contentmodel: (
    | 'css'
    | 'javascript'
    | 'json'
    | 'sanitized-css'
    | 'scribunto'
    | 'text'
    | 'wikitext'
  ) &
    string
  pagelanguage: string
  pagelanguagehtmlcode: string
  pagelanguagedir: 'ltr' | 'rtl'
  touched: string
  lastrevid: number
  length: number
  protection: []
  restrictiontypes: string[]
  fullurl: string
  canonicalurl: string
  varianttitles?: Record<string, string>
  actions: {
    edit: boolean
    move: boolean
    delete: boolean
  }
  templates: {
    ns: number
    title: string
  }[]
  images: {
    ns: number
    title: string
  }[]
}
