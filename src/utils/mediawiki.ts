const config = mw.config.get()
const mwApi = new mw.Api({
  ajax: {
    headers: {
      'x-query-initiator': 'inpageedit-next',
    },
  },
})
const mwUtil = mw.util
const { user, hook } = mw

export { config, config as conf, hook, mwApi, mwUtil, user }
