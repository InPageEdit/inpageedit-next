<template lang="pug">
n-modal.quickEdit(
  v-model:show="enable"
  :mask-closable="false"
)
  n-card(
    :bordered="false"
    :style="{ width: '95vw' }"
    closable
    @close="closeModal"
    title="Quick Edit"
  )
    n-tabs(type="line")
      n-tab-pane(
        v-for="(pageName, index) in pageList"
        :key="pageName"
        :name="`editor-${index}`"
        :tab="pageName"
        type="card"
        closeable
        @close="handleTagClose"
      )
        editor-area(:page-name="pageName")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { conf } from '../../utils/mediawiki'
import EditorArea from './EditorArea.vue'

import { useMessage } from 'naive-ui'
const message = useMessage()

export default defineComponent({
  components: { EditorArea },
  props: {
    enable: Boolean,
  },
  data() {
    return {
      pageList: [conf.wgPageName, 'a', 'b', 'c'] as string[],
    }
  },
  mounted() {},
  methods: {
    closeModal() {
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('update:enable', false)
    },
    handleTagClose(name) {
      const list = this.pageList
      if (list.length <= 1) {
        message.error('不能再关了！')
      }
      const index = Number(name.split('-')[1])
      list.splice(index, 1)
    },
  },
})
</script>

<style scoped lang="sass"></style>
