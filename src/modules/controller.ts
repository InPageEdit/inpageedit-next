/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { config, hook } from '../utils/mediawiki'
import { enableModule, moduleStates } from './moduleStates'
import { useDialog } from 'naive-ui'

import QuickEdit from '../components/QuickEdit/QuickEdit.vue'

export const quickEdit = ({ page = config.wgPageName }) => {
  enableModule('quickEdit')
  if (moduleStates.value.quickEdit.ctx.tabs.find((i) => i.page === page)) {
    return false
  }
  moduleStates.value.quickEdit.ctx.tabs.push({
    page,
  })
  hook('InPageEdit.quickEdit').fire(QuickEdit)
  return QuickEdit
}

hook('InPageEdit.Core').fire({ quickEdit })
window.InPageEdit = {
  quickEdit,
  dialog: useDialog(),
}
