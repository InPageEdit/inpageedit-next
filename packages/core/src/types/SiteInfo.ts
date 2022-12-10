export interface SiteInfo {
  general: {
    mainpage: string
    base: string
    sitename: string
    mainpageisdomainroot: boolean
    logo: string
    generator: string
    phpversion: string
    phpsapi: string
    dbtype: string
    dbversion: string
    imagewhitelistenabled: boolean
    langconversion: boolean
    titleconversion: boolean
    linkprefixcharset: string
    linkprefix: string
    linktrail: string
    legaltitlechars: string
    invalidusernamechars: string
    allunicodefixes: boolean
    fixarabicunicode: boolean
    fixmalayalamunicode: boolean
    'git-hash'?: string
    'git-branch'?: string
    case: 'first-letter' | string // ?
    lang: string
    fallback?: {
      code: string
    }[]
    variants: {
      code: string
      name: string
    }[]
    rtl: boolean
    fallback8bitEncoding: string
    readonly: boolean
    writeapi: boolean
    maxarticlesize: number
    timezone: string
    timeoffset: number
    articlepath: string
    scriptpath: string
    script: string
    variantarticlepath: string | false
    server: string
    servername: string
    wikiid: string
    time: string
    misermode: boolean
    uploadsenabled: boolean
    maxuploadsize: number
    minuploadchunksize: number
    galleryoptions: {
      imagesPerRow: number
      imageWidth: number
      imageHeight: number
      captionLength: boolean
      showBytes: boolean
      showDimensions: boolean
      mode: 'traditional' | string // ?
    }
    thumblimits: Record<`${number}`, number>
    imagelimits: Record<`${number}`, { width: number; height: number }>
    favicon: string
    centralidlookupprovider: string
    allcentralidlookupproviders: string[]
    interwikimagic: boolean
    magiclinks: Record<string, boolean>
    categorycollation: 'uppercase' | string // ?
    citeresponsivereferences: boolean
  }
  namespaces: Record<
    `${number}`,
    {
      id: number
      case: 'case-sensitive' | string // ?
      name: string
      subpages: boolean
      canonical: string
      content: boolean
      nonincludable: boolean
      namespaceprotection?: string
      defaultcontentmodel?: string
    }
  >
  namespacealiases: {
    id: number
    alias: string
  }[]
  magicwords: {
    name: string
    aliases: string[]
    'case-sensitive': boolean
  }[]
  extensiontags: string[]
  functionhooks: string[]
}
