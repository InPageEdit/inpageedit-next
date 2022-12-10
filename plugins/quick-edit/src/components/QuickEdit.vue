<template lang="pug">
.quick-edit
  textarea(v-model:value='text')
  button(@click='submit') submit
  button(@click='preview') preview
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type WikiPage } from '../../../../packages/wikipage/src'

const props = defineProps<{ page: WikiPage }>()

const isLoading = ref(true)
const text = ref('')
const originalText = ref('')

onMounted(() => {
  props.page.parse().then(({ data }) => {
    isLoading.value = false
    text.value = data.parse.wikitext
    originalText.value = data.parse.wikitext
  })
})

async function submit() {
  props.page.edit({ text: text.value })
}
async function preview() {
  props.page.preview({ pst: 1 })
}
</script>

<style scoped lang="sass"></style>
