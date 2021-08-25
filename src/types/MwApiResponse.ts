export interface MwApiEditResponse {
  edit: {
    result: string
    pageid: number
    title: string
    contentmodel: string
    oldrevid?: number
    newrevid: number
    newtimestamp: string
  }
}

export interface MwApiErrorResponse {
  error: {
    code: string
    info: string
    docref: string
  }
}
