/* eslint-disable @typescript-eslint/no-empty-function */ /* eslint-disable
vue/require-prop-types */
<template lang="pug">
n-modal.quickEdit(v-model:show='enable', :mask-closable='false')
  n-card(
    :bordered='false',
    :style='{ width: "95vw" }',
    closable,
    @close='closeModal',
    title='Quick Edit'
  )
    n-tabs(
      v-model:value='ctx.curTab',
      type='card',
      addable,
      :closable='ctx.tabs.length > 1',
      @add='handleTabAdd',
      @close='handleTabClose'
    )
      n-tab-pane(
        v-for='(item, index) in ctx.tabs',
        :key='item.page',
        :name='`editor-${index}`',
        :tab-name='`editor-${index}`',
        :tab='item.page',
        type='card',
        display-directive='show'
      )
        editor-area(:page-name='item.page')
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, h, ref } from 'vue'
import EditorArea from './EditorArea.vue'

import { disableModule, moduleStates } from '../../modules/moduleStates'
import { NForm, NFormItem, NInput, useDialog, useMessage } from 'naive-ui'
import { QuickEditCtx } from '../../types/ModuleCtx'
import { quickEdit } from '../../modules/controller'
const message = useMessage()
const dialog = useDialog()

const components = defineComponent({ EditorArea })
const props =
  defineProps<{
    enable: boolean
    ctx: QuickEditCtx
  }>()
const addPage = ref('')

const closeModal = () => {
  disableModule('quickEdit')
}
const handleTabAdd = () => {
  addPage.value = ''
  dialog.create({
    title: '再编辑一个页面吧！',
    content() {
      return h(NForm, {}, [
        h(NFormItem, {}, [
          h(
            NInput,
            {
              value: addPage.value,
              'onUpdate:value': (value) => {
                addPage.value = value
              },
            },
            ''
          ),
        ]),
      ])
    },
    positiveText: '确定',
    onPositiveClick: () => {
      if (!addPage.value) return false
      const add = quickEdit({ page: addPage.value })
      if (!add) return false
    },
  })
}
const handleTabClose = (name: string) => {
  const list = props.ctx.tabs
  if (list.length <= 1) {
    return message.error('不能再关了！')
  }
  const index = Number(name.split('-')[1])
  list.splice(index, 1)
  moduleStates.value.quickEdit.ctx.curTab = `editor-${index - 1}`
}
</script>

<style scoped lang="sass"></style>