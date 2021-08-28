/* eslint-disable vue/one-component-per-file */
<template lang="pug">
//- Containers
n-loading-bar-provider
  n-message-provider
    n-notification-provider
      n-dialog-provider
        modules-index
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import ModulesIndex from './components/index.vue'

import { template } from './utils'

const components = defineComponent({ ModulesIndex })

// template
template.set('core', {
  quick_edit: '快速编辑',
})
console.log('template', template('core.quick_edit'))
</script>

<style scoped lang="sass"></style>
