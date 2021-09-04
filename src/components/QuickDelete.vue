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
<script setup lang="ts">
import { defineComponent, defineProps, ref } from 'vue'
import { mwApi, user } from '../utils/mediawiki'
import { Logger } from '../utils'
import { useMessage } from 'naive-ui'
const logger = new Logger('QuickRedirect')
const props = defineProps<{
  enabled: boolean
  pageName: string
}>()
const message = useMessage()
const formValue = ref({
  reason: '',
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
    .postWithToken('csrf', {
      action: 'delete',
      title: props.pageName,
      reason: formValue.value.reason,
      watchlist: formValue.value.addWatch ? 'watch' : 'unwatch',
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
