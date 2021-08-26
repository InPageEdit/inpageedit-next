<template lang="pug">
n-modal.quick-delete(
  v-model:show="enabled"
  preset="card"
  :bordered="false"
  title="Quick Delete"
  :style="{width: '30vw'}"
)
  .delete-form
    n-form(
      :model="formValue"
      :disabled="formDisabled"
      ref="formRef"
      label-placement="top"
    )
      n-form-item(label="删除理由" path="reason")
        n-input(
          placeholder=""
          v-model:value="formValue.reason"
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

import { ApiDeleteParams } from 'types-mediawiki/api_params'

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
        reason: '',
      },
      formDisabled: true,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!this.userCanDelete()) {
        return
      }
      this.formDisabled = true
    },
    formToMwApiParams(): ApiDeleteParams {
      const req: ApiDeleteParams = {
        action: 'delete',
        title: this.pageName,
        reason: this.formValue.reason,
      }
      return req
    },
    userCanDelete(): boolean {
      // TODO: how to check user rights?
      return true
    },
    async submit() {
      logger.info(
        'submit',
        { formValue: this.formValue },
        this.formToMwApiParams()
      )
      //await mwApi.postWithToken('csrf', this.formToMwApiParams())
    },
  },
})
</script>
