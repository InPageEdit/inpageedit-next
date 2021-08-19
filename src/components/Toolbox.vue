<template lang="pug">
.toolbox
  NButton(type="primary") {{ template('core.quick_edit') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { template } from '../utils'

export default defineComponent({
  components: {
    NButton,
  },
  data() {
    return {
      template,
    }
  },
  method: {
    quickEdit() {
      this.$emit('quick-edit', { page: mw.config.get('wgPageName') })
    },
  },
  mounted() {
    console.log(template('core.quick_edit'))
  },
})
</script>

<style scoped lang="sass">
.toolbox
  position: fixed
  bottom: 2rem
  right: 2rem
  z-index: 90
</style>
