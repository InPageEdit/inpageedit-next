<template lang="pug">
.toolbox
  n-button(
    type='primary',
    @click='fn.quickEdit({ page: config.wgPageName })',
    :title='template("core.quick_edit")'
  )
    n-icon
      EditOutlined
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { template } from '../utils'
import { config } from '../utils/mediawiki'
import * as fn from '../modules/controller'
import { EditOutlined } from '@vicons/antd'
</script>

<style scoped lang="sass">
.toolbox
  position: fixed
  left: 3rem
  bottom: 3rem
  z-index: 90
</style>
