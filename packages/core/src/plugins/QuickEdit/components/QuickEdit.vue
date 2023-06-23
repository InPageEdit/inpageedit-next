<template lang="pug">
.quick-edit
  .loading(v-if='!wikiPage') loading...
  .quick-edit-container(v-else)
    pre.debug {{ wikiPage?.pageInfo }}
</template>

<script setup lang="ts">
import { effect } from 'vue'
import type { WikiPage } from '../../../../../wikipage/src'

const props = defineProps<{
  wikiPage?: WikiPage
}>()

effect(() => {
  console.log('wikiPage', props.wikiPage)
})
</script>

<style scoped lang="sass"></style>
