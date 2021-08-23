<template lang="pug">
.editorArea
  n-spin(:show="loading")
    n-alert(type="error" v-if="error") {{ error }}
    n-form(
      :model="formValue"
      :disabled="formDisabled"
      label-placement="top"
    )
      n-form-item(label="源代码" path="wikitext")
        n-input(
          type="textarea"
          placeholder=""
          :autosize="{ minRows: 5, maxRows: 20 }"
          v-model:value="formValue.wikitext"
        )
      n-form-item(label="编辑摘要" path="settings")
        n-input(
          placeholder="// Edit via InPageEdit@next ~"
          v-model:value="formValue.settings.summary"
        )
      .editorSettings
        n-space
          n-checkbox(
            v-model:checked="formValue.settings.minor"
          ) 标记为小编辑
          n-checkbox(
            v-model:checked="formValue.settings.watchList"
          ) 添加到监视列表
      .editorSubmit
        n-button(type="primary" @click="submit") 提交

  pre.formValue {{ JSON.stringify(formValue, null, 2) }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mwApi } from '../../utils/mediawiki'
import { Logger } from '../../utils'
const logger = new Logger('QuickEdit')

import { MwApiParse } from '../../types'

export default defineComponent({
  components: {},
  props: {
    pageName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formValue: {
        wikitext: '',
        settings: {
          summary: '',
          minorEdit: true,
          watchList: true,
        },
      },
      error: '',
      loading: false,
      formDisabled: true,
      pageParse: {} as any,
      pageQuery: {} as any,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.formDisabled = true
      this.loading = true
      this.getPageParseData()
    },
    async getPageParseData() {
      mwApi
        .get({
          format: 'json',
          action: 'parse',
          page: this.pageName,
          prop: 'wikitext|langlinks|categories|templates|images|sections',
        })
        .then(
          (data) => {
            const { parse } = data as MwApiParse
            this.formValue.wikitext = parse.wikitext['*']
            this.formDisabled = false
          },
          (errCode, err) => {
            this.error = err
            console.log(err)
          }
        )
        .always(() => {
          this.loading = false
        })
    },
    getPageQueryData() {
      //
    },
    submit() {
      logger.info('submit', { formValue: this.formValue })
    },
  },
})
</script>

<style scoped lang="stylus"></style>
