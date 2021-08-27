import { ref } from 'vue'

import { QuickEditCtx } from '../types/ModuleCtx'

const _defaults = {
  quickEdit: {
    enable: false,
    ctx: {
      curTab: 'editor-0',
      tabs: [],
    } as QuickEditCtx,
  },
  quickRedirect: {
    enable: false,
    ctx: {},
  },
  quickDelete: {
    enable: false,
    ctx: {},
  },
}

export const moduleStates = ref(_defaults)
export const enableModule = (module: keyof typeof _defaults): void => {
  moduleStates.value[module].enable = true
}
export const disableModule = (module: keyof typeof _defaults): void => {
  moduleStates.value[module].enable = false
}
