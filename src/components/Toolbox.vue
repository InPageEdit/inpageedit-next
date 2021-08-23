<template lang="pug">
.toolbox
  n-button(
    type="primary"
    @click="moduleEnable.quickEdit = true"
  ) {{ template('core.quick_edit') }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NButton } from 'naive-ui'
import { template } from '../utils'
import { moduleEnable } from '../App.vue'

export default defineComponent({
  components: {
    NButton,
  },
  data() {
    return {
      template,
      moduleEnable,
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
  left: 2rem
  bottom: 2rem
  z-index: 90
</style>
