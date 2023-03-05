import { InPageEdit } from '../../core/src'

const { wgServer, wgScriptPath } = globalThis.mw.config.get()
const { hook } = globalThis.mw.hook
InPageEdit.newFromApiEndpoint(wgServer + wgScriptPath + 'api.php').then(async (ipe) => {
  hook('InPageEdit').fire(ipe)
})
