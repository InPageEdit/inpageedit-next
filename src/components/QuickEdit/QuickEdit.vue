<template lang="pug">
n-modal.quickEdit(
  v-model:show="enable"
  :mask-closable="false"
  preset="card"
  :bordered="false"
  title="Quick Edit"
  :style="{ width: '95vw' }"
)
  editor-area(v-for="pageName in pageList" :page-name="pageName")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditorArea from './EditorArea.vue'

export default defineComponent({
  components: { EditorArea },
  props: {
    enable: Boolean,
  },
  data() {
    return {
      pageList: ['user:机智的小鱼君'] as string[],
    }
  },
  mounted() {},
  methods: {},
})
</script>

<style scoped lang="stylus"></style>
