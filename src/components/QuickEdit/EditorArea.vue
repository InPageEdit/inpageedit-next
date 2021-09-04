<template lang="pug">
.editorArea
  n-spin(:show='loading || submitLoading')
    n-alert(type='warning', v-if='error') {{ error }}
    n-form(:model='formValue', label-placement='top')
      n-form-item(label='源代码', path='wikitext')
        n-input(
          type='textarea',
          placeholder='',
          :autosize='{ minRows: 10 }',
          v-model:value='formValue.wikitext'
        )
      n-form-item(label='编辑摘要', path='settings')
        n-input(
          size='small',
          placeholder='// Edit via InPageEdit@next ~',
          v-model:value='formValue.summary'
        )
      n-form-item(:show-label='false')
        n-space
          n-checkbox(v-model:checked='formValue.minorEdit') 标记为小编辑
          n-checkbox(v-model:checked='formValue.addWatch') 添加到监视列表
      n-form-item(:show-label='false')
        n-space
          n-popconfirm(
            @positive-click='submit',
            positive-text='确定',
            :negative-text='null'
          )
            template(#trigger)
              n-button(type='primary', :loading='submitLoading') {{ submitLoading ? "正在保存" : "保存编辑" }}
            | 确定要保存编辑吗？
          n-button 预览变更

  details
    pre.formValue {{ JSON.stringify(formValue, null, 2) }}
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, h, ref } from 'vue'
import { mwApi, user } from '../../utils/mediawiki'
import { Logger } from '../../utils'
const logger = new Logger('QuickEdit')
const message = useMessage()
const dialog = useDialog()

import {
  MwApiMultiErrorResult,
  MwApiParseResult,
  MwApiQueryPagesResult,
} from '../../types'
import { useDialog, useMessage } from 'naive-ui'

const props = defineProps<{
  pageName: string
  tabName: string
}>()

const formValue = ref({
  wikitext: '',
  summary: '',
  minorEdit: false,
  addWatch: !!user.options.get('watchdefault'),
})
const error = ref('')
const loading = ref(false)
const submitLoading = ref(false)
const pageParse = ref({} as MwApiParseResult)
const pageQuery = ref({} as MwApiQueryPagesResult)

const init = () => {
  loading.value = true
  getPageParseData()
}

const getPageParseData = async () => {
  mwApi
    .get({
      action: 'parse',
      page: props.pageName,
      prop: [
        'wikitext',
        'langlinks',
        'categories',
        'templates',
        'images',
        'sections',
      ],
    })
    .then(
      ({ data }) => {
        loading.value = false
        pageParse.value = data as MwApiParseResult
        const { parse } = pageParse.value
        formValue.value.wikitext = parse.wikitext + '\n'
        getPageQueryData()
      },
      (err) => {
        loading.value = false
        error.value = err.response.data.info
        logger.warn(err)
      }
    )
}

const getPageQueryData = () => {
  mwApi
    .get({
      action: 'query',
      prop: ['revisions', 'info'],
      inprop: 'protection',
      pageids: [pageParse.value.parse.pageid],
      format: 'json',
      formatversion: '2',
    })
    .then(
      ({ data }) => {
        loading.value = false
        pageQuery.value = data as MwApiQueryPagesResult
        logger.log('queryData', data)
      },
      (err) => {
        loading.value = false
        error.value = err.response.data.info
        logger.warn(err)
      }
    )
}
const submit = () => {
  submitLoading.value = true

  const parse = pageParse.value.parse
  const query = pageQuery.value.query
  const thisPage = query.pages[0]

  logger.info('submit', { formValue: formValue.value })

  mwApi
    .postWithEditToken({
      ...{
        action: 'edit',
        starttimestamp: thisPage.revisions[0].timestamp,
        basetimestamp: thisPage.touched,
        // baserevid: thisPage.revid,
        title: parse.title,
        text: formValue.value.wikitext,
        summary: formValue.value.summary,
        watchlist: formValue.value.addWatch ? 'watch' : 'unwatch',
      },
      ...(formValue.value.minorEdit ? { minor: 1 } : {}),
    })
    .then(
      ({ data }) => {
        logger.info('submit ok')
        submitLoading.value = false
        message.success('保存成功！')
      },
      (err) => {
        const e = err.response.data as MwApiMultiErrorResult
        logger.info('submit failed', err)
        dialog.error({
          title: `保存失败：${e.errors[0].code}`,
          content: e.errors[0].info,
        })
        submitLoading.value = false
      }
    )
}

// monted
init()
</script>

<style scoped lang="sass"></style>
