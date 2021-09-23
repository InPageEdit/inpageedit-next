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

const components = defineComponent({ ModulesIndex })
</script>

<style scoped lang="sass"></style>
