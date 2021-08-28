<template lang="pug">
n-modal.quick-redirect(
  v-model:show="enabled"
  preset="card"
  :bordered="false"
  title="Quick Redirect"
  :style="{width: '30vw'}"
)
  .redirect-form
    n-form(
      :model="formValue"
      :disabled="formDisabled"
      ref="formRef"
      label-placement="top"
    )
      n-form-item(label="重定向起点" path="redirectFrom")
        n-input(
          placeholder=""
          v-model:value="formValue.redirectFrom"
        )
      n-form-item(label="重定向目标" path="redirectTo")
        n-input(
          placeholder=""
          v-model:value="formValue.redirectTo"
        )
      n-form-item
        n-button(@click="submit") 提交

    pre.formValue {{ JSON.stringify(formValue, null, 2) }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { mwApi } from '../utils/mediawiki'
import { Logger } from '../utils'
const logger = new Logger('QuickRedirect')

import { ApiEditPageParams } from 'types-mediawiki/api_params'

export default defineComponent({
  components: {},
  props: {
    enabled: Boolean,
    pageName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      formRef: null,
      formValue: {
        redirectFrom: '',
        redirectTo: '',
        settings: {
          minorEdit: false,
        },
      },
      formDisabled: true,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.formDisabled = true
    },
    formToMwApiParams(): ApiEditPageParams {
      const req: ApiEditPageParams = {
        action: 'edit',
        title: this.formValue.redirectFrom,
        text: `#REDIRECT [[:${this.formValue.redirectTo}]]`,
        summary: `[InPageEdit] Quick redirect to ${this.formValue.redirectTo}`,
        formatversion: '2',
      }
      if (this.formValue.settings.minorEdit) {
        req.minor = true
      }
      return req
    },
    async submit() {
      logger.info(
        'submit',
        { formValue: this.formValue },
        this.formToMwApiParams()
      )
      //const res = await mwApi.postWithEditToken(this.formToMwApiParams())
    },
  },
})
</script>
