<template lang="pug">
toolbox
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toolbox from './components/Toolbox.vue'

import i18n from './modules/i18n/zh-hans'

import { template } from './utils'

export default defineComponent({
  components: { Toolbox },
  data() {
    return {}
  },
  method: {},
  mounted() {
    template.set('core', {
      quick_edit: '快速编辑',
    })
  },
})
</script>

<style scoped lang="stylus"></style>
