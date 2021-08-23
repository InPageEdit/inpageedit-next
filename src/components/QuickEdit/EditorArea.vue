<template lang="pug">
.editorArea
  n-form(
    :model="formValue"
    :disabled="formDisabled"
    ref="formRef"
    label-placement="top"
  )
    n-form-item(label="源代码" path="wikitext")
      n-input(
        type="textarea"
        placeholder=""
        v-model:value="formValue.wikitext"
      )
    n-form-item
      n-button(@clicl="submit") 提交

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
      formRef: null,
      formValue: {
        wikitext: '',
        settings: {
          minorEdit: true,
        },
      },
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
      this.getPageParseData()
    },
    async getPageParseData() {
      const { parse } = (await mwApi.get({
        format: 'json',
        action: 'parse',
        page: this.pageName,
        prop: 'wikitext|langlinks|categories|templates|images|sections',
      })) as MwApiParse
      this.formValue.wikitext = parse.wikitext['*']
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
