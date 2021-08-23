<template lang="pug">
//- Containers
n-loading-bar-provider
  n-message-provider
    n-notification-provider
      n-dialog-provider

        //- Start
        quick-edit(v-model:enable="enable.quickEdit")
        //- Inject Toolbox
        toolbox
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Toolbox from './components/Toolbox.vue'
import QuickEdit from './components/QuickEdit/QuickEdit.vue'

import { template } from './utils'

export const moduleEnable = ref({
  quickEdit: false,
})

export default defineComponent({
  components: { QuickEdit, Toolbox },
  data() {
    return {
      enable: moduleEnable,
    }
  },
  mounted() {
    template.set('core', {
      quick_edit: '快速编辑',
    })
  },
  methods: {},
})
</script>

<style scoped lang="sass"></style>
