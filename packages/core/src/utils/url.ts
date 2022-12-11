import { useContext } from './useContext'

export const useGetScript = useContext((ctx) => {
  const site = ctx.siteInfo.general
  return (name = 'index') => {
    const url = new URL(site.server)
    url.pathname = `${site.scriptpath}/${name.endsWith('.php') ? name.substring(name.length - 4) : name}.php`
    return url.href
  }
})

export const useGetUrl = useContext((ctx) => {
  const site = ctx.siteInfo.general
  return (title: string, params?: Record<string, string>) => {
    return params
      ? `${site.script}?${new URLSearchParams({ ...params, title })}`
      : `${site.articlepath.replace('$1', encodeURI(title))}`
  }
})
