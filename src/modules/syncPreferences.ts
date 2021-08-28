// ========================================= //
// 跨设备设置同步：使用 mw 自带的 option API，
// 将 IPE 的参数设置保存在数据库内，实现多端同步
// ========================================= //

import { AxiosResponse } from 'axios'
import { mwApi } from '../utils/mwApi'

const prefKey = (name: string) => `userjs-inpageedit-${name}`

export async function setPreferences(
  key: string,
  value: Record<string, any>
): Promise<AxiosResponse<{ options: 'success' }>> {
  value = {
    ...mw.user.options.get(prefKey(key)),
    ...value,
  }
  mw.user.options.set(prefKey(key), value)
  return mwApi.postWithToken('csrf', {
    format: 'json',
    action: 'options',
    change: `${prefKey(key)}=${encodeURIComponent(JSON.stringify(value))}`,
  })
}

export async function getPreferences(
  key: string
): Promise<Record<string, any>> {
  const { data } = await mwApi.get({
    format: 'json',
    action: 'query',
    meta: 'userinfo',
    uiprop: 'options',
  })
  const option = JSON.parse(
    decodeURIComponent(data.query.userinfo.options[prefKey(key)] || '{}')
  )
  mw.user.options.set(prefKey(key), option)
  return option
}
