export const config = mw.config.get()
export const mwUtil = mw.util
export const { user, hook } = mw

export const mwApi = new mw.Api({
  parameters: {
    action: 'query',
    errorformat: 'plaintext',
    format: 'json',
    formatversion: 2,
  },
  ajax: {
    headers: {
      'api-user-agent': `InPageEdit/next (${config.wgWikiID})`,
    },
  },
})

export { config as conf }
