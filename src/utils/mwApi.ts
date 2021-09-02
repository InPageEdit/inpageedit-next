import axios, { AxiosResponse } from 'axios'
import { ApiQueryAllMessagesParams } from 'types-mediawiki/api_params'
import { config, mwUtil, user } from './mediawiki'

export const mwApi = {
  // AJAX
  ajax: axios.create({
    baseURL: mwUtil.wikiScript('api'),
    timeout: 30 * 1000,
    headers: {
      'api-user-agent': `InPageEdit/next (${config.wgWikiID})`,
    },
    params: {
      action: 'query',
      errorformat: 'plaintext',
      format: 'json',
      formatversion: 2,
    },
  }),
  // GET
  get(params: Record<string, any>): Promise<AxiosResponse<any>> {
    return this.ajax.get('', {
      params,
    })
  },
  async getUserInfo(): Promise<{
    id: number
    name: string
    groups: string[]
    rights: string[]
    blockid?: number
    blockedby?: string
    blockedbyid?: number
    blockedtimestamp?: string
    blockreason?: string
    blockexpiry?: string
  }> {
    const { data } = await this.get({
      action: 'query',
      meta: 'userinfo',
      uiprop: ['groups', 'rights', 'blockinfo'],
    })
    return data?.query?.userinfo
  },
  // POST
  post(body: Record<string, any>): Promise<AxiosResponse<any>> {
    return this.ajax.post('', {
      body,
    })
  },
  postWithToken(
    tokenType: 'csrf' | 'patrol' | 'watch',
    body: Record<string, any>
  ): Promise<AxiosResponse<any>> {
    return this.post({ token: user.tokens.get(`${tokenType}Token`), ...body })
  },
  postWithEditToken(body: Record<string, any>): Promise<AxiosResponse<any>> {
    return this.postWithToken('csrf', body)
  },
  // MESSAGES
  async getMessages(ammessages: string[], options?: ApiQueryAllMessagesParams) {
    const { data } = await this.get({
      action: 'query',
      meta: 'allmessages',
      ammessages,
      amlang: config.wgUserLanguage,
      ...options,
    })
    const result: Record<string, string> = {}
    data.query.allmessages.forEach(function (obj: {
      missing?: boolean
      name: string
      content: string
    }) {
      if (!obj.missing) {
        result[obj.name] = obj.content
      }
    })
    return result
  },
  // PAGE
  async parseWikitext(wikitext: string, page?: string): Promise<string> {
    const { data } = await this.post({
      action: 'parse',
      contentmodel: 'wikitext',
      page,
      text: wikitext,
    })
    return data.parse.text
  },
}
