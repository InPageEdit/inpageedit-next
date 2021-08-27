export interface QuickEditCtx {
  curTab: string
  tabs: QuickEditCtxTabs[]
}

export interface QuickEditCtxTabs {
  page?: string
  section?: number | 'new'
  reload?: boolean
}
