<template lang="pug">
#ModulesIndex
  Toolbox

  QuickEdit(
    :enable="states.quickEdit.enable"
    :ctx="states.quickEdit.ctx"
  )
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { moduleStates as states } from '../modules/moduleStates'

import Toolbox from './Toolbox.vue'
import QuickEdit from './QuickEdit/QuickEdit.vue'

const components = defineComponent({ Toolbox, QuickEdit })
</script>

<style scoped lang="sass"></style>
