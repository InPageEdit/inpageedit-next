<template lang="pug">
.quick-edit
  .loading(v-if='!wikiPage') loading...
  .quick-edit-container(v-else)
    NForm
      NFormItem(label='内容')
        NInput(
          type='textarea',
          :default-value='wikiPage.pageInfo.revisions?.[0].content',
          v-model:value='form.content'
        ) {{ wikiPage.pageInfo.revisions?.[0]?.content }}
      NFormItem(label='编辑摘要')
        NInput(v-model='form.summary')
    .buttons
      NButton(type='primary', @click='handleSubmit') 保存
    details
      .moe-wikitext-output
        pre.debug {{ wikiPage?.pageInfo }}
</template>

<script setup lang="ts">
import { effect } from 'vue'
import type { WikiPage } from '../../../../../wikipage/src'

const props = defineProps<{
  wikiPage?: WikiPage
}>()

const form = reactive({
  content: '',
  summary: '',
})

function handleSubmit() {
  const api = new globalThis.mw.Api({
    ajax: {
      parameters: {
        format: 'json',
        formatversion: 2,
      },
    },
  })
  api.postWithToken('csrf', {
    action: 'edit',
    title: props.wikiPage!.pageInfo.title,
    text: form.content,
    summary: form.summary,
    basetimestamp: props.wikiPage!.pageInfo.revisions?.[0]?.timestamp,
  })
}
</script>

<style scoped lang="sass">
.quick-edit
  padding: 1em

textarea
  width: 100%
  min-height: 50vh
  resize: vertical
  padding: 0.5em
  line-height: 1.2
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 0.5em
  outline: none
  &:hover
    border-color: rgba(0, 0, 0, 0.2)
  &:focus
    border-color: rgba(0, 0, 0, 0.3)
</style>
