import { mwApi } from '../utils/mwApi'

// Get userinfo
mwApi.getUserInfo().then((data) => {
  mw.config.set('wgUserRights', data.rights)
  mw.config.set('wgIsBlocked', !!data.blockid)
})
