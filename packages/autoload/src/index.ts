import { InPageEdit } from '@inpageedit/core'
;(() => {
  const { config, hook } = globalThis.mw
  const ipe = InPageEdit.newFromApiEndpoint(config.wgServer + config.wgScriptPath + 'api.php')
  hook.fire('InPageEdit', ipe)
})()
