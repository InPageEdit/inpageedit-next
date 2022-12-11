<template lang="pug">
.quick-edit
  textarea(v-model:value='text')
  button(@click='submit') submit
  button(@click='preview') preview
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { InPageEdit } from '../../../../packages/core/src'

const props = defineProps<{ ctx: InPageEdit; title: string }>()

const isLoading = ref(true)
const text = ref('')
const originalText = ref('')
const page = ref()

onMounted(() => {
  props.ctx.WikiPage.newFromTitle(props.title).then((pageinfo) => {
    isLoading.value = false
    page.value = pageinfo
    text.value = pageinfo.PAGEINFO.revisions[0].content
    originalText.value = text.value
  })
})

async function submit() {
  page.value.edit({ text: text.value })
}
async function preview() {
  page.value.preview(text.value)
}
</script>

<style scoped lang="sass"></style>
