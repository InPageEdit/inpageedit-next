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
<script setup lang="ts">
import { defineComponent, defineProps, ref } from 'vue'
import { mwApi, user } from '../utils/mediawiki'
import { Logger } from '../utils'
const logger = new Logger('QuickRedirect')
import { useMessage } from 'naive-ui'
import { ApiEditPageParams } from 'types-mediawiki/api_params'
const props = defineProps<{
  enabled: boolean
  pageName: string
}>()
const message = useMessage()
const formValue = ref({
  redirectFrom: '',
  redirectTo: '',
  minorEdit: false,
  addWatch: !!user.options.get('watchdefault'),
})
const loading = ref(false)
const submitLoading = ref(false)
const init = () => {
  loading.value = true
}
const submit = () => {
  submitLoading.value = true
  logger.info('submit', { formValue: formValue.value })
  mwApi
    .postWithEditToken({
      ...{
        action: 'edit',
        title: formValue.value.redirectFrom,
        text: `#REDIRECT [[:${formValue.value.redirectTo}]]`,
        summary: `[InPageEdit] Quick redirect to ${formValue.value.redirectTo}`,
        watchlist: formValue.value.addWatch ? 'watch' : 'unwatch',
      },
      ...(formValue.value.minorEdit ? { minor: 1 } : {}),
    })
    .then(
      (data) => {
        if (data.edit.result === 'Success') {
          logger.info('submit ok')
          message.success('保存成功！')
        } else {
          logger.warn('submit failed')
          message.error(`保存失败：${data.errors[0].text}`)
        }
        submitLoading.value = false
      },
      (err) => {
        message.error(err)
        submitLoading.value = false
      }
    )
}
</script>
